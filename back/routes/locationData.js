var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var locationSchema = new schema({
	"가맹점": String, 
	"주소": String, 
	"대표자": String, 
	"tel": String, 
	"타입": String, 
	"lat": Number, 
	"lng": Number, 
	"이메일": String 
}, { collection : 'location' });
locationSchema.plugin(mongoosePaginate);
var locationData = mongoose.model('location', locationSchema);
var pageNum;

router.get('/', function(req, res, next) {
	if(req.query.page == null) pageNum = 1;
	else pageNum = parseInt(req.query.page);

	locationData.paginate({}, {page:pageNum, limit:10}, function(err, docs){
		var locationData = {
			"total" : docs.total,
			"per_page" : docs.limit,
			"current_page" : docs.page,
			"last_page" : docs.pages,
			"next_page_url" : "/api/locationData?page=2",
			"prev_page_url" : null,
			"from" : 1,
			"to" : 10,
			"data": docs.docs
		};
		res.json(locationData);
	});
})

module.exports = router;

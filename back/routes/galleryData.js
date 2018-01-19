var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;
var gallerySchema = new schema({
	"모델명": String, 
	"제품명": String, 
	"라벨표": String, 
	"자동차모델": String
}, { collection : 'gallery' });
gallerySchema.plugin(mongoosePaginate);
var galleryData = mongoose.model('gallery', gallerySchema);
var pageNum;

router.get('/', function(req, res, next) {
	if(req.query.page == null) pageNum = 1;
	else pageNum = parseInt(req.query.page);

	galleryData.paginate({}, {page:pageNum, limit:10}, function(err, docs){
		var galleryData = {
			"total" : docs.total,
			"per_page" : docs.limit,
			"current_page" : docs.page,
			"last_page" : docs.pages,
			"next_page_url" : "/api/galleryData?page=2",
			"prev_page_url" : null,
			"from" : 1,
			"to" : 10,
			"data": docs.docs
		};
		res.json(galleryData);
	});
});

module.exports = router;

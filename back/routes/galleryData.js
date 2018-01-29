var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var tableManager = require('./tableManager');
var schema = mongoose.Schema;
var gallerySchema = new schema({
	"모델명": String, 
	"제품명": String, 
	"라벨표": String, 
	"자동차모델": String
}, { collection : 'gallery' });
gallerySchema.plugin(mongoosePaginate);
var galleryData = mongoose.model('gallery', gallerySchema);
var url = "/api/galleryData";

router.get('/', function(req, res, next) {
	var pageNum = parseInt(req.query.page);
	var perPage = parseInt(req.query.per_page);
	galleryData.paginate({}, {page:pageNum, limit:perPage}, function(err, docs){
		var data = tableManager.setTable(docs, url);
		res.json(data);
	});
});

module.exports = router;

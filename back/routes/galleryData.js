var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var gallerySchema = new schema({
	data: [
		{ "모델명": String, "제품명": String, "라벨표": String, "자동차모델": String }
	]
}, { collection : 'gallery' });
var data = mongoose.model('gallery', gallerySchema);

router.get('/', function(req, res, next) {
	data.find({}, function(err, data){
		res.send(data[0])
	});
});

module.exports = router;

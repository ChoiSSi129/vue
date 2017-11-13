var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var listSchema = new schema({
	year: [
		{ id: Number, text: String }
	],
	list: [
		{ id: Number, yearID : Number, url: String, title: String, text: String }
	]
}, { collection : 'data' });
var list = mongoose.model('list', listSchema);

router.get('/', function(req, res, next) {
	list.find({},function(err, data){
		res.send(data)
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var locationSchema = new schema({
	data: [
		{ "가맹점": String, "주소": String, "대표자": String, "tel": String, "타입": String, "lat": Number, "lng": Number, "이메일": String }
	]
}, { collection : 'location' });
var data = mongoose.model('location', locationSchema);

router.get('/', function(req, res, next) {
	data.find({}, function(err, data){
		res.send(data[0])
	});
});

module.exports = router;

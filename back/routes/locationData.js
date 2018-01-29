var express = require('express');
var router = express.Router();
var app = express();
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var tableManager = require('./tableManager');
var schema = mongoose.Schema;
var locationSchema = new schema({
	"가맹점": String, 
	"주소": String, 
	"대표자": String, 
	"tel": String, 
	"타입": String, 
	"lat": String, 
	"lng": String, 
	"이메일": String 
}, { collection : 'location' });
locationSchema.plugin(mongoosePaginate);
var locationData = mongoose.model('location', locationSchema);
var url = "/api/galleryData";

router.get('/', function(req, res, next) {
	var pageNum = parseInt(req.query.page);
	var perPage = parseInt(req.query.per_page);
	locationData.paginate({}, {page:pageNum, limit:perPage}, function(err, docs){
		var data = tableManager.setTable(docs, url);
		res.send(data);
	});
});

router.post('/', function(req, res, next) {
	var body = req.body;
	if(body.type === "delete"){
		locationData.findOneAndRemove({"가맹점": body.data.가맹점}, function(err){
			if(err) console.log(err);
			else console.log("Delete Complete")
			res.send({removeComplete: true});
		});
	} else if(body.type === "add"){
		console.log(body)
		var data = new locationData({
			가맹점: body.data.가맹점, 
			주소: body.data.주소, 
			대표자: body.data.대표자, 
			tel: body.data.tel, 
			타입: body.data.타입, 
			lat: body.data.lat, 
			lng: body.data.lng, 
			이메일: body.data.이메일
		});
		data.save(function(err){
			if(err) console.log(err);
			else console.log("Save Complete");
			res.send({addComplete: true});
		});
	}
	
});

module.exports = router;

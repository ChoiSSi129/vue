var mongoose = require('mongoose');
var schema = mongoose.Schema;
class TableManager {
	constructor(){
		
	}

	setTable(data, url){
		var obj = {
			"total" : data.total,
			"per_page" : data.limit,
			"current_page" : data.page,
			"last_page" : data.pages,
			"next_page_url" : url+"?page=2",
			"prev_page_url" : null,
			"from" : 1,
			"to" : 10,
			"data": data.docs
		};
		return obj;
	}
}

module.exports = new TableManager();
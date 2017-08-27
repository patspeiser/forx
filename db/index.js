const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx', {logging: false});

var Currency = db.define('currency', {
		base: { type: Sequelize.STRING },
		date: { type: Sequelize.STRING },
		rates: { type: Sequelize.JSON }
	});

Currency.getPrevious = function(id){
	var previousId = (id > 1) ? id -1 : id;
	return this.findById(previousId)
	.then(function(result){
		return result;
	});
};

Currency.getNext = function(id){
	var nextId = id + 1;
	return this.findById(nextId)
	.then(function(result){
		return result;
	})
}

module.exports = {
	db: db,
	models: {
		Currency: Currency
	}
}
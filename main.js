const fixer = require('fixer-io-node');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx', {logging: false});
var chalk = require('chalk');
var SimpleDate = require('simple-datejs');

/*
{ 
	base: 'EUR',              
	date: '2017-08-17',       
	rates:                    
	{ AUD: 1.4756,           
		BGN: 1.9558,           
		DKK: 7.4354,           
		GBP: 0.90895,          
		HKD: 9.1517,           
		ZAR: 15.442 
	} 
};
*/

db.sync(/*{force: true}*/);
	
var Currency = db.define('currency', {
	base: { type: Sequelize.STRING },
	date: { type: Sequelize.STRING },
	rates: { type: Sequelize.JSON }
});

var date = new SimpleDate(2000, 00, 00);
//date = date.toString('yyyy-MM-dd') 
//date = date.toString('yyyy-MM-dd');

var _incrementDay = function(date){
	date.addDays(1)
	return date.toString('yyyy-MM-dd');
};

//Base currency  
var _setBaseCurrency = function(currency){
	return '?base='+ currency.toUpperCase();
};
var _buildUrl = function(date, currency){
	var dateToCheck = _incrementDay(date);
	var currencyType = _setBaseCurrency(currency);
	dateToCheck.concat(currencyType)
	return dateToCheck.concat(currencyType); 
};


var UPDATE_CURRENCIES = function(endpoint){
	fixer.latest(endpoint).then(function(result){
		return Object.keys(result).forEach(function(key){
			return Currency.create({
				base:  result.base,
				rates: result.rates,
				date:  result.date
			})
		})
	}).catch( function(error){
		console.log(chalk.red(error));
	});
};

var UPDATE_HISTORICAL = function(endpoint){
	fixer.historical(endpoint)
	.then(function(result){
		//save to DB
		console.log(result);
	}).catch(function(error){
		console.log(error);
	})
}
	

UPDATE_HISTORICAL(_buildUrl(date, 'USD'));




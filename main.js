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

db.sync({force: true});
	
var Currency = db.define('currency', {
	base: { type: Sequelize.STRING },
	date: { type: Sequelize.STRING },
	rates: { type: Sequelize.JSON }
});

var _incrementDay = function(date){
	date.addDays(1)
	return date.toString('yyyy-MM-dd');
};

//Base currency  
var _setBaseCurrency = function(currency){
	return '?base='+ currency.toUpperCase();
};

var _buildUrl = function(date, currency){
	var dateToCheck = date.toString('yyyy-MM-dd');
	var currencyType = _setBaseCurrency(currency);
	dateToCheck.concat(currencyType)
	return dateToCheck.concat(currencyType); 
};

/*
var _dateCheck = function(startTime, endTime){
	this.startTime = startTime ||'2000-12-30';
	while(startTime < endTime ){
		startTime = _incrementDay(startTime);
	}
	return startTime;
}


var UPDATE_CURRENCIES = function(endpoint){
	fixer.latest(endpoint)
	.then(function(result){
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
*/

var UPDATE_HISTORICAL = function(endpoint){
	return fixer.historical(endpoint)
	.then(function(result){
		console.log('!@#$#@!@#');
		return Currency.create(result);
	}).catch(function(error){
		return console.log(chalk.red(error));
	});
}

var fromDate = new SimpleDate(2000, 00, 00);
var toDate = new SimpleDate(2017, 07, 19);
/*
var currencyList = ['USD']; //,'JPY', 'EUR', 'NZD', 'PLN'];
while (date.toString('yyyy-MM-dd') != today.toString('yyyy-MM-dd')){
		currencyList.forEach( function(currency){
//			UPDATE_HISTORICAL(_buildUrl(date, currency));
		});
		_incrementDay(date);
};
*/
fromDate.toString('yyyy-MM-dd');
toDate.toString('yyyy-MM-dd');

for (fromDate; fromDate.toString('yyyy-MM-dd') != toDate.toString('yyyy-MM-dd'); fromDate.addDays(1)){
	console.log(fromDate.toString('yyyy-MM-dd'), toDate.toString('yyyy-MM-dd'))
	UPDATE_HISTORICAL(_buildUrl(fromDate, 'USD'));
}
var currencyList = ['USD']; //,'JPY', 'EUR', 'NZD', 'PLN'];
if (!date){
	while (date.toString('yyyy-MM-dd') != today.toString('yyyy-MM-dd')){
		UPDATE_HISTORICAL(_buildUrl(date, currency));
	_incrementDay(date);
};

} else {

}
//socket server instead of cron? 
//UPDATE_HISTORICAL(_buildUrl(date, 'USD'));

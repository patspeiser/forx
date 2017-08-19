const fixer = require('fixer-io-node');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx'/*, {logging: false}*/);
var chalk = require('chalk');
//var XLSX = require('xlsx');
//var workbook = XLSX.readFile('./data_sets/Exchange_Rate_Report.xls');
//console.log(workbook);

var data = { 
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


	db.sync({force: true});
		
	var Currency = db.define('currency', {
		base: { type: Sequelize.STRING },
		date: { type: Sequelize.STRING },
		rates: { type: Sequelize.JSON }
	});

/*
var reducer = function(obj){
	dataSet = obj.rates;
	var formattedData = Object.keys(obj).reduce(function(hash, currentValue, currentIndex, array){
	
		##haven't seen the key (currentValue)? adds key to hash
		##have seen the key appened to the array for its hash value.

		if ( Object.keys(hash).indexOf(currentValue) < 0 ) {
			hash[ currentValue ] = [ dataSet[currentValue] ] ;
			return hash;
		}
		hash[ currentValue ].push(dataSet[currentValue]);
		return hash;
	}, {});
	return formattedData;
}
*/

var base = 'latest?base=USD';

fixer.latest('latest?base=USD').then(function(result){
	Object.keys(data).forEach(function(keyValue){
		var otherCurrencyQuote = data[keyValue][0];
		return Currency.create({
					base:  result.base,
					rates: result.rates,
					date:  result.date
				})
	})
}).then(function(currency){
	console.log(chalk.blue(currency));
}).catch( function(){
   	console.log(chalk.red(error));
});






const fixer = require('fixer-io-node');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx', {logging: false});
var chalk = require('chalk');
var SimpleDate = require('simple-datejs');


/*
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
*/

db.sync(/*{force: true}*/);
	
var Currency = db.define('currency', {
	base: { type: Sequelize.STRING },
	date: { type: Sequelize.STRING },
	rates: { type: Sequelize.JSON }
});
var x = 0;

//while(x<50){
//while	x++;
	var date = new SimpleDate(2000, 0, 0);
	date.addDays(25);
	console.log(date.toString('yyyy-MM-dd'));
	//console.log(date.getDate() + 1);
	//console.log(date);
	//date.setDate(date.getDate() + x) / 1000;
	//console.log(date);
//}
//viar startDate = Date.UTC(2000, 01, 01) / 1000;
//console.log(startDate);
var latest = 'latest?base=USD';
var historical = '2001-09-12?base=USD';
/*
var UPDATE_CURRENCIES = function(endpoint){
	fixer.latest(endpoint).then(function(result){
		return Object.keys(data).forEach(function(key){
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
/*
var UPDATE_HISTORICAL = function(endpoint){
	fixer.
}
*/

//UPDATE_CURRENCIES(historical);
//UPDATE__(historical);





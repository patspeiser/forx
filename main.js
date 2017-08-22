const fixer = require('fixer-io-node');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx', {logging: false});
const chalk = require('chalk');
const datejs = require('./date.js');
const request = require('request');
const sleep = require('sleep').sleep;

var Currency = db.define('currency', {
	base: { type: Sequelize.STRING },
	date: { type: Sequelize.STRING },
	rates: { type: Sequelize.JSON }
})

//psql db forx table currencies
db.sync(/*{force: true}*/);

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
var startConfig = {year: 2000, month: 00, day: 01};
var startDate = new Date.today().set(startConfig)//.toString('yyyy-MM-dd');
var startDateString = startDate.toString('yyyy-MM-dd');

var endConfig = {year: 2017, month: 07, day: 01};
var endDate = new Date.today().set(endConfig)//.toString('yyyy-MM-dd')
var endDateString = endDate.toString('yyyy-MM-dd');

var requestUrl = 'http://api.fixer.io/' + startDateString + '?base=USD';
var startDateEpoch = (new Date(startDate)).getTime() / 1000;
var endDateEpoch = (new Date(endDate)).getTime() / 1000;

var oneDay = 60 * 60 * 24;

for (startDateEpoch; startDateEpoch < endDateEpoch; (startDateEpoch += oneDay)){
	console.log(startDateEpoch, endDateEpoch, oneDay);
	console.log(startDateEpoch);
}



/*

var fromDate = {
	day: 1,
	month: 1,
	year: 2000
}
//make these a class
var toDate = {
	day: 30,
	month: 11,
	year: 2000
}

	
function _incrementDay(date){
	return date.add({days: 1});
};

function _setBaseCurrency(currency){
	return '?base='+ currency.toUpperCase;
};

function _makeRequest(requestUrl){
	request(requestUrl, function(error, response, body){
		if (error) throw error;
		var body = JSON.parse(body);
		console.log(body);
		return Currency.create({
			base: body.base,
			rates: body.rates,
			date: body.date
		}).then(function(){
			console.log('finished')
		})
	});
};

var fromDate = Date.today().set(fromDate);
var toDate = Date.today().set(toDate);

function _buildUrl(endpoint, date, currency){
	this.endpoint = endpoint;
	this.dateString = date.toString('yyyy-MM-dd');
	this.currency = currency.toUpperCase;
	return this.endpoint + this.dateString + '?base=' + currency;
};

function run(from, till, currency){
	var requestUrl = _buildUrl('http://api.fixer.io/', from, currency);
	for (var d = from ; d <= toDate; d.add({days: 1})){
		console.log('startdate', d, toDate);
		_makeRequest(requestUrl);
		sleep(1);
	}
}
console.log('starting...');
console.log(fromDate, toDate);
run(fromDate, toDate, 'USD');

*/
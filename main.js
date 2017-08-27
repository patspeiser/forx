const fixer = require('fixer-io-node');
const chalk = require('chalk');
const datejs = require('./date.js');
const request = require('request');
const sleep = require('sleep').sleep;
const Util = require('./utils.js');
const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io-client')(process.env.SOCKET_SERVER || 'http://localhost:3000');
const server = require( path.join(__dirname + '/server.js') );
const Currency = require('./db/index.js').models.Currency;
module.exports = app;
console.log(Currency);
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

var configDate = {
	start: {
		startConfig: 		function(){ return {year: 2000, month: 00, day: 01} },
		startDate: 			function(){ return new Date.today().set(this.startConfig) },//.toString('yyyy-MM-dd')
		startDateString: 	function(){ return this.startDate().toString('yyyy-MM-dd') },
		startDateEpoch: 	function(){ return new Date(this.startDate()).getTime() / 1000 }
	},
	end: {
		endConfig: 			function(){ return {year: 2017, month: 07, day: 01} },
	 	endDate: 			function(){ return new Date.today().set(this.endConfig) },//.toString('yyyy-MM-dd')
		endDateString: 		function(){ return this.endDate().toString('yyyy-MM-dd') },
		endDateEpoch: 		function(){ return new Date(endDate).getTime() / 1000 }
	}
}

var date = new Date(configDate.start.startDateEpoch());

function getRequestUrl(date){
	var requestUrl = 'http://api.fixer.io/' + date.toString('yyyy-MM-dd') + '?base=USD';
	date.add({days:1});
	return requestUrl;
}

socket.on('_', function(){
	console.log(chalk.cyan(startDate, endDate, date));
	
	//if we get to the end bail
	if (date.toString('yyyy-MM-dd') == endDate.toString('yyyy-MM-dd')) {console.log( 'reached endDate' ); return}; 

	//make request to get currency data
	// tried turning this to find or create but gave up and reverted
	var requestUrl = getRequestUrl(date);
	console.log(chalk.yellow(requestUrl));
	return request(requestUrl, function(error, headers, body){
		var body = JSON.parse(body);
		return Currency.create({
			base: body.base,
			rates: body.rates,
			date: body.date
		}).then(function(result){
			console.log(date, '...created new record');
			return result;
		})
	});
});
/*
{ 
	base: 'eur',              
	date: '2017-08-17',       
	rates:                    
	{ aud: 1.4756,           
		bgn: 1.9558,           
		dkk: 7.4354,           
		gbp: 0.90895,          
		hkd: 9.1517,           
		zar: 15.442 
	} 
};
*/


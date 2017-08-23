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

const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io-client')(process.env.SOCKET_SERVER || 'http://localhost:3000');
const server = require( path.join(__dirname + '/server.js') );
module.exports = app;

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
var startDateEpoch = (new Date(startDate)).getTime() / 1000;

var endConfig = {year: 2017, month: 07, day: 01};
var endDate = new Date.today().set(endConfig)//.toString('yyyy-MM-dd')
var endDateString = endDate.toString('yyyy-MM-dd');
var endDateEpoch = (new Date(endDate)).getTime() / 1000;
var date = new Date(startDateEpoch * 1000);

function getRequestUrl(date){
	var requestUrl = 'http://api.fixer.io/' + date.toString('yyyy-MM-dd') + '?base=USD';
	date.add({days: 1});
	return requestUrl;
}

socket.on('do', function(){
	console.log(chalk.cyan(startDate, endDate, date));
	var requestUrl = getRequestUrl(date);
	console.log(chalk.yellow(requestUrl));
	return request(requestUrl, function(error, headers, body){
		var body = JSON.parse(body);
		return Currency.create({
			base: body.base,
			rates: body.rates,
			date: body.date
		}).then(function(currency){
			console.log('record created')});
			return currency;
	});
});
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


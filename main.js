const fixer = require('fixer-io-node');
const chalk = require('chalk');
const datejs = require('./date.js');
const request = require('request');
const sleep = require('sleep').sleep;
const Utils = require('./utils.js');
const express = require('express');
const app = express();
const path = require('path');
const socket = require('socket.io-client')(process.env.SOCKET_SERVER || 'http://localhost:3000');
const server = require( path.join(__dirname + '/server.js') );
const Currency = require('./db/index.js').models.Currency;
module.exports = app;


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

Currency.findAll({
	where: {
		base: 'USD'
	}
}).then(function(results){
	var allQuotesByDate = {};
	for (result in results){
		allQuotesByDate[results[result].date] = results[result].rates 
	/* { date : {country : rate } } */
	}
	days = Object.keys(allQuotesByDate);
	console.log('days', days);
	for(day in days){
		console.log(allQuotesByDate[days[day]])
	}
});







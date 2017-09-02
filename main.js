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
var blessed = require('blessed');
var contrib = require('blessed-contrib');

module.exports = app;

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/index.html'));
});

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
/*####################################################################*/
/*####################################################################*/
/*####################################################################*/
/*####################################################################*/
	var allQuotesByDate = {};
	var allQuotesByCurrency = {};

	function getAllQuotesBy(results){
		/* { date : {country : rate } } */
		/* { currency : {date : rate } } */
		var numLoops = 0;
		for (result in results){
			resultVal = results[result];
			allQuotesByDate[resultVal.date] = resultVal.rates 
			rates = resultVal.rates;
			for (rate in rates){
				// do later. group by currency. class method? 
			}
		}

		return { 
				'currency'	: allQuotesByCurrency, 
				'date'		: allQuotesByDate 
				};
	}

	allQuotesByDate     = getAllQuotesBy(results).date;

	var values = [];

	days = Object.keys(allQuotesByDate);
	
	var bank = {};
	for(day in days){
		var date = days[day]
		var quotes = allQuotesByDate[date];
		for (quote in quotes){
			if (quote == 'EUR'){
				//console.log(date, quote, quotes[quote]);
				values.push(quotes[quote]);
			}
		}
	}

	var screen = blessed.screen()
 	var line = contrib.line(
		{ style:
			{ line: "yellow",
		 	text: "green",
		 	baseline: "black"},
		 	xLabelPadding: 3,
		 	xPadding: 5,
		 	label: 'Title'
		 }),
	data = {
		x: Object.keys(allQuotesByDate),
		y: values
	}
   screen.append(line) //must append before setting data
   line.setData([data])

   screen.key(['escape', 'q', 'C-c'], function(ch, key) {
   	return process.exit(0);
   });

   screen.render()
});

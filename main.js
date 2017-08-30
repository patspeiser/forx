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
/*####################################################################*/
/*####################################################################*/
/*####################################################################*/
/*####################################################################*/
	var allQuotesByDate = {};

	function getAllQuotesByDate(results){
		for (result in results){
			allQuotesByDate[results[result].date] = results[result].rates 
			/* { date : {country : rate } } */
		}
		return allQuotesByDate;
	}

	allQuotesByDate = getAllQuotesByDate(results);

	days = Object.keys(allQuotesByDate);
	var bank = {};
	for(day in days){
		var date = days[day]
		var quotes = allQuotesByDate[date];
		for (quote in quotes){
			if (!bank[quote]){
				bank[quote] = [ quotes[quote] ]
			} else {
				bank[quote].push(quotes[quote]);
			}
		} 
	}
	//have all quotes by date

	var bankItems = Object.keys(bank);
	//console.log(bank);
	for (item in bankItems){
		var banked = bank[ bankItems[item] ];
		var total  = 0;
		var runs   = 0; 
		var above  = 0
		
		for(var i = 0; i < banked.length; i++){
			total += banked[i]	
			runs  += 1;
		}


		var storage = {
			'upOnce': 0,
			'upTwice': 0,
			'total'  : 0
		};
		
		for(var i = 0; i < banked.length; i++){
			storage.total += 1;
			if (banked[i+2]){
				if(banked[i+1] > banked[i]){
					storage.upOnce+=1;	
					if (banked[i+2] > banked[i+1]){
						storage.upTwice+=1;
					}
				}
			}	
		} 
		var ratioUpOnce  = (storage.upOnce / storage.total).toFixed(10) * 100;
		var ratioUpTwice = (storage.upTwice / storage.total).toFixed(10) * 100;
		console.log(  bankItems[item], ratioUpOnce, ratioUpTwice); 
		//console.log(storage, Math.round(storage.up / storage.total, 5)  );
		//console.log( bankItems[item] + ' Average: ' + banked[item], total / runs);
	}	
});

//Currency.getNext(1234).then(function(results){console.log(results); return;})
//Currency.getPrevious(1234).then(function(results){console.log(results); return;})




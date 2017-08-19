const fixer = require('fixer-io-node');
const Sequelize = require('sequelize');
const db = new Sequelize('postgres://postgres:postgres@localhost/forx');

var data = { base: 'EUR',              
	date: '2017-08-17',       
	rates:                    
	{ AUD: 1.4756,           
		BGN: 1.9558,           
		DKK: 7.4354,           
		GBP: 0.90895,          
		HKD: 9.1517,           
	ZAR: 15.442 } };


db.sync({force: true});

var currency = db.define('currency', {
	base_currency: { type: Sequelize.STRING },
	other_currency: { type: Sequelize.STRING },
	date: {type: Sequelize.STRING }
});

var reducer = function(dataset){
	dataSet = dataset.rates;
	var formattedData = Object.keys(dataSet).reduce(function(hash, currentValue, currentIndex, array){
		if ( Object.keys(hash).indexOf(currentValue) < 0 ) {
			hash[ currentValue ] = [ dataSet[currentValue] ] ;
			return hash;
		}
		hash[ currentValue ].push(dataSet[currentValue]);
		return hash;
	}, {});
	return formattedData;
}


fixer.latest('latest').then(function(result){
	var data_sets = [];
	data_sets.push(reducer(result));
	console.log(data_sets);
}).catch(function(error){
	console.log(error);
});








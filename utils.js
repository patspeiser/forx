var reducer = function(data){
	var reduced; 
}

module.exports = {
	reducer: reducer 
}

/*
//
//used these to seed DB from fixer API
//
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
*/

/*
var reducer = function(data, obj){
	var obj = {};
	for (row in data){
		console.log(row);
		Object.keys(data).reduce(function(hash, currentValue){
			if ( Object.keys(data).indexOf(currentValue) == 0 ) {
				obj[ currentValue ] = [ data.rates ] ;
				console.log('obj', obj);
			} else {
				obj[ currentValue ].push(data.rates);
			}
		}, obj);
	} 
}
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
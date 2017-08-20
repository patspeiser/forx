module.exports = {
	reducer: reducer 
}


var reducer = function(obj){
	dataSet = obj.rates;
	var formattedData = Object.keys(obj).reduce(function(hash, currentValue, currentIndex, array){
		if ( Object.keys(hash).indexOf(currentValue) < 0 ) {
			hash[ currentValue ] = [ dataSet[currentValue] ] ;
			return hash;
		}
		hash[ currentValue ].push(dataSet[currentValue]);
		return hash;
	}, {});
	return formattedData;
}
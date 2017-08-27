var reducer = function(obj, dataSetKey){
	dataSet = obj.dataSetKey;
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

module.exports = {
	reducer: reducer 
}
/**
 * Simple function that takes an address and returns the Google
 * url string for a Timezone JSON object
 */

var timeKey = require('./keys');
var key = timeKey.timezone();

module.exports = function getAddress(lattitude, longitude, timestamp){
	var addressString = 'https://maps.googleapis.com/maps/api/timezone/json?location='
		+ lattitude
		+ ','
		+ longitude
		+ '&timestamp='
		+ timestamp
		+ '&key=' 
		+ key;
	
	return addressString;
}
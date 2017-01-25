/**
 * Simple function that takes an address and returns the Google
 * url string for a Geocoding JSON object
 */

var geokey = require('./keys');
var key = geokey.geo();

module.exports = function getAddress(address){
	var addressString = 'https://maps.googleapis.com/maps/api/geocode/json?address='
		+ address
		+ '&key=' 
		+ key;
	
	return addressString;
}
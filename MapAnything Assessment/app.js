var express = require('express');
var request = require('request');
var rp = require('request-promise');
var app = express();
var geoString = require('./geoString'); 
var timeString = require('./timeString'); 


/*******************************************************************
 * Takes an address and returns a JSON object from Google's 
 * Geocoding Web Service.  The address is input in the browser in the
 * form of http://127.0.0.1:8081/geocode/<address goes here>
 ******************************************************************/

app.get('/geocode/:address', function(req, res) {
	url = geoString(req.params.address); // takes the query string parameter and returns URL
	
	var options = {
		    uri: url,
		    qs: {
		        access_token: '' // not needed'
		    },
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};
	
	// rp(response-promise) helps with synchronizing 
	rp(options).then(function(data){
		res.send(data);
		console.log('Geocoding Object Sent');
	});

})

/*******************************************************************
 * Takes an address and returns a JSON object from Google's Timezone
 * Web Service.  The address is input in the browser in the form of
 * http://127.0.0.1:8081/timezone/<address goes here>
 ******************************************************************/

app.get('/timezone/:address', function(req, res) {
	var timestamp = Date.now().toString();
	var time = timestamp.substring(0, timestamp.length-2);
	var long = '';
	var lat = '';
	url = geoString(req.params.address);
	
	var options = {
		    uri: url,
		    qs: {
		        access_token: '' // not needed
		    },
		    headers: {
		        'User-Agent': 'Request-Promise'
		    },
		    json: true // Automatically parses the JSON string in the response
		};
	
	rp(options).then(function(data){
		if(data.status === 'OK') {
			// parses JSON object and returns longitude and latitude
			// but Google specifically needs 8 characters for both
			long = data.results[0].geometry.location.lng.toPrecision(8);
			lat = data.results[0].geometry.location.lat.toPrecision(8);
		}		
		
		url = timeString(lat, long, time);
		
		
	}).then(function(){
		var options = {
			    uri: url,
			    qs: {
			        access_token: '' // not needed'
			    },
			    headers: {
			        'User-Agent': 'Request-Promise'
			    },
			    json: true // Automatically parses the JSON string in the response
			};
		
		rp(options).then(function(data){
			res.send(data);
			console.log('Timezone Object Sent');
		}).catch(function(err){
			res.send(err.error);
			console.log('Timezone Error Sent');
		})
	})
	
})

/*******************************************************************
 * This function starts the server
 ******************************************************************/
var server = app.listen(8081, function() {
	var host = server.address().address
	var port = server.address().port
	var address = server.address()

	console.log("Example app listening at http://%s:%s", host, port)
})
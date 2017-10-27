var jsonSchemes = require('./json-schemes.js');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var mercHood = require('./items/Mercenary Hood.json');

if(v.validate(mercHood, jsonSchemes.item)) {
	console.log('worked!');
}
else {
	console.log('didnt work!');
}
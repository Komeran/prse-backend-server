var express = require('express');
var app = express();
var config = require('./prse-server-config.json');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var jsonSchemes = require('./json-schemes.js');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/ping', function (req, res) {
  res.send('pong');
});

app.get('/crafting', function(req, res) {
	res.send('Incomplete Request');
});

app.get('/crafting/recipe/:item', function(req, res) {
	var item = req.params.item;
	res.send('Requested recipe for: '+item);
});

app.post('/crafting/item/new', function(req, res) {
	var name = req.body.name;
	var filePath = path.join(__dirname, 'items', name+'.json');
	console.log('Client sent item "'+name+'"');
	console.log('Validating item JSON schema.');
	if(v.validate(req.body, jsonSchemes.item)) {
	console.log('Validation passed. Checking if file exists already.');
		if(fs.existsSync(filePath)) {
			fs.unlinkSync(filePath);
			fs.writeSync(filePath, req.body);
			console.log('Item file "'+name+'.json" already exists. Replaced file.');
		}
		else {
			fs.writeSync(filePath, req.body);
			console.log('Item file "'+name+'.json" does not exist yet. Created file.');
		}
	}
	else {
		
		console.log('Validiation did not pass. Wrong JSON Structure!');
	}
});

app.get('/crafting/item/get/:name', function(req, res) {
	var name = req.params.name;
	console.log('Client requested item "'+name+'"');
	if(fs.existsSync(path.join(__dirname, 'items', name+'.json'))) {
		res.sendFile(name+'.json', { root: path.join(__dirname, 'items') });
		console.log('Sent "'+name+'.json" to client.');
	}
	else {
		res.sendStatus(404);
		console.log('Item file "'+name+'.json" does not exist! Sent 404 to client.');
	}
});

app.listen(config.port, function () {
  console.log('PRSE Backend Server listening on port '+config.port+'!');
});
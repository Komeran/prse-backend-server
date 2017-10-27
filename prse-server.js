var express = require('express');
var app = express();
var config = require('./prse-server-config.json');

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

app.post('/crafting/item/add', function(req, res){
	res.send(200);
});

app.listen(config.port, function () {
  console.log('PRSE Backend Server listening on port '+config.port+'!');
});
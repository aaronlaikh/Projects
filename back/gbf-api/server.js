var express = require('express');
var app = express();
var fs = require("fs");

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

MongoClient.connect(url, function(err, client) {
	console.log("Connected");
	var db = client.db('gbf-api-dev');
	var cursor = db.collection('characters').find();
	cursor.each(function(err, doc){
		console.log(doc);
	});

	client.close();
})

/* SAMPLE GET
app.get('/listUsers', function(req, res) {
	fs.readFile( __dirname + "/" + "users.json", "utf8", function(err, data)
	{
		console.log(data);
		res.end(data);
	});
});
*/

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port);
});
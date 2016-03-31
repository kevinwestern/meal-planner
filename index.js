'use strict';

var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

if (module === require.main) {
  // Start the server
  var server = app.listen(process.env.PORT || 8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;
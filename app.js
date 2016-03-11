'use strict';

const PORT = process.env.PORT || 3333;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
//var sweetalert = require('sweetalert');

var http = require('http');
var path = require('path');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  var indexPath = path.join(__dirname, 'index.html');
  res.sendFile(indexPath);
});

app.use('/items', require('./routes/items'));

var server = http.createServer(app);

server.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});

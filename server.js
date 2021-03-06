'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
let controller = require('./controller')

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect("mongodb://127.0.0.1:27017", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use(controller)

app.listen(port, function () {
  console.log('Node.js listening ...');
});
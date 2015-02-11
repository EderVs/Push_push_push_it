/**
	Requires
**/
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = 3000;

/**
	Settings
**/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

/**
	Routes
**/
var application = require('./routes/index');

app.use('/', application);

/**
	Listening
**/
server.listen(port, function (){
	console.log('Listening in localhost:3000');
})

exports.io = io;
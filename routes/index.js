/**
	Requires
**/
var express = require('express');
var async = require('async');

var app = express();

var module_app;
var io;

async.waterfall([
	function (callback){
		module_app = require("../index");
		callback(null);
	},
	function (module_app_now, callback){
		io = module_app.io;
	}
], function (err){
	console.log(err);
});

/**
	Routes
**/
app.get('/', function (req, res){
	console.log("GET /")
	res.render('index', {message: ""});
});

app.get('/play', function (req, res){
	console.log("GET /play")
	res.render('play', {message: ""});
});

console.log("Hola");

module.exports = app;

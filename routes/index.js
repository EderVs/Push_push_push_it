/**
	Requires
**/
var express = require('express');
var async = require('async');

var app = express();

var module_app;
var io;

var user1= false;
var user2= false;
var vs;

//Getting socket.io
async.waterfall([
	function (callback){
		module_app = require("../index");
		callback(null);
	},
	function (module_app_now, callback){
		io = module_app.io;

		io.sockets.on('connection', function (socket){
			if (user1)
			{
				user2 = true;
				socket.emit("User", 2);
			}
			else
			{
				user1 = true;
				socket.emit("User", 1);
			}

			if(user1 && user2)
			{
				io.emit("start", {});
				vs = 7;
			}

			socket.on('change', function (data){
				console.log(data);
				vs += data;
				console.log(vs);
				if (vs == 0 || vs == 14)
				{
					if(vs == 0)
					{
						socket.emit('wins', 2);
						socket.broadcast.emit('wins', 2);
					}
					else
					{
						socket.emit('wins', 1);
						socket.broadcast.emit('wins', 1);
					}
				}
				else
				{
					socket.emit('another_change', data);
					socket.broadcast.emit('another_change', data);
				}
			});

		});
	}
], function (err){
	console.log(err);
});

/**
	Routes
**/

//Get land page
app.get('/', function (req, res){
	console.log("GET /")
	res.render('index', {message: ""});
});

//Get play page
app.get('/play', function (req, res){
	console.log("GET /play")
	res.render('play', {message: ""});
});

module.exports = app;

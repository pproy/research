(function(){
 'use strict';

	var express = require('express');
	var path = require('path');	
	var mongoose = require('mongoose'); 				// mongoose for mongodb
	var port = process.env.PORT || 8080; 				// default port 8080
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var routes = require('./routes/index');

	var db = mongoose.connect('mongodb://localhost/todo', function(err){
		if(err)
			console.log(err)
		else
			console.log('mongo connected successfully')
	});

	var app = express(); 						// create app 

	app.set('port', port);
	// view engine setup
   app.set('views', path.join(__dirname, 'views'));
   app.engine('html', require('ejs').renderFile);
   app.set('view engine', 'html');

	app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); // log every request to the console
	app.use(bodyParser.json({limit: '10mb'}));

	app.use('/', routes);

	

	var server = app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + server.address().port);
	});

	module.exports = app;



}());




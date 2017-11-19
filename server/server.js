(function(){
 'use strict';

	const express = require('express');
	const path = require('path');	
	const mongoose = require('mongoose'); 				// mongoose for mongodb
	const port = process.env.PORT || 8080; 				// default port 8080
	const morgan = require('morgan');
	const bodyParser = require('body-parser');
	const routes = require('./routes/index');

	const db = mongoose.connect('mongodb://localhost/todo', function(err){
		if(err)
			console.log(err)
		else
			console.log('mongo connected successfully')
	});

	const app = express(); 						// create app 

	app.set('port', port);
	// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

	app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
	app.use(morgan('dev')); // log every request to the console
	app.use(bodyParser.json({limit: '10mb'}));
	app.use('/', routes);


	const server = app.listen(app.get('port'), function() {
		console.log('Express server listening on port ' + server.address().port);
	});

	module.exports = app;

}());
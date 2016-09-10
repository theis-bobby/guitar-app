//dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

//port variable init
var port  = process.env.PORT || 3000;

//set routes from routes file
var routes = require('./routes');

//app init
var app = express();

//body parser init
app.use(bodyParser.json());

//static files set up
app.use(express.static(__dirname + '/client')); //sets up views path
app.use('/node_modules', express.static(__dirname + '/node_modules')); //sets up dependency script paths in index html file
app.use('/uploads', express.static(__dirname + '/uploads')); //sets up image path

//test route
//
// app.get('/chordList', function(req, res){
// 	console.log('recieved request from chordList');
// });

//create mongoose connection
mongoose.connect('mongodb://localhost/guitar');
mongoose.connection.once('open', function(){
	//apply routes to app
	routes(app);

	//start server listening
	app.listen(port, function(){
		//give a response that app is listening on which port
		console.log('Listening on port ' + port);
	});
});






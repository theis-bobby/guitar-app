//Chords controller

var mongoose = require('mongoose'); //dependency 
var express = require('express');	//dependency

var Chord = require('../models/index').Chord; //Schema/model

var router = express.Router(); //router init

//still don't know about promises
mongoose.Promise = global.Promise;

//---------------
//	Routes
//---------------
//route gets all the chords in the database
router.get('/', function(req, res){
	Chord.find(function(err, results){
		if(err){ console.log(err); }
		console.log(__dirname);
		res.send(results);
	});
});

router.post('/', function(req, res){
	//req.body is an object that is identical to the Chord schema.
	//req.body object creation is done on the client side
	var chord = new Chord(req.body);

	chord.save(function(err, results){
		console.log('resultsID: ' + results._id);
		res.send({resultId: results._id});
	});

	// var promise = chord.save();

	// promise.then(function(err, results){
	// 	if(err){ console.log(err); }
	
	// 	console.log('results._id: '+ results._id);
	// 	res.send('Chord Saved');
	// });
});

//route delets a specific song
router.delete('/:id', function(req, res){
	//url parameter
	var id = req.params.id;

	//check right id is being used
	// console.log(id);
	// console.log(mongoose.Types.ObjectId(id)); //mongoose saves id's as an object

	//delete the given chord
	Chord.remove({_id: mongoose.Types.ObjectId(id)}, function(err){
		if(err){console.log(err);}

		res.send('Chord Deleted');
	});
});

//export chord controller
module.exports = router;












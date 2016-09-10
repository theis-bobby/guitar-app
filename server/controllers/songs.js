//Songs Server Controller

var mongoose = require('mongoose'); //dependency
var express = require('express'); //dependency

var Song = require('../models/index').Song; //import song model
var router = express.Router(); //init router

//still trying to figure out exactly how this is used
mongoose.Promise = global.Promise;

//---------------
//	Routes
//---------------
//route gets all the songs in the database
router.get('/', function(req, res){
	Song.find(function(err, results){
		if(err){ console.log(err); }
	
		res.send(results);
	});
});

//route gets 1 single song
router.get('/:id', function(req, res){

	Song.findById(req.params.id, function(err, song){
		if(err){
			throw err;
		}
		console.log("body:  "+JSON.stringify(req.body, null, 2));
		res.send(song);
	});
});

//route saves a new song
router.post('/', function(req, res){
	//req.body is an object that is identical to the Song schema.
	//req.body object creation is done on the client side
	//this helps reduce the amount of time the request takes on the server? faster responses?
	var song = new Song(req.body); //create song object

	//check to make sure right values are being used
	// console.log("song:  " + JSON.stringify(song, null, 2));
	// console.log("body:  " + JSON.stringify(req.body, null, 2));

	//i forgot what this does or if i even need it
	song.markModified('section');

	//save song
	var promise = song.save();

	//still don't know how to use promises
	promise.then(function(err, results){
		if(err){ console.log(err); }
	
		res.send(song);
	});
});

//route updates a specific songs specific section
router.put('/:songId/:sectionId', function(req, res){
	//get the sectionId from the url parameter
	var sectionId = req.params.sectionId;

	//update the song
	//need to understand this update syntax better and $set method(this is a mongo/mongoose method)
	Song.update({ 'section._id': mongoose.Types.ObjectId(sectionId) }, {
		$set: {
			'section.$.part': req.body.part,
			'section.$.progression': req.body.progression
		}
	}, function(err){
		if(err){ console.log(err); }

		res.send('Song Updates');
	});
});

//delete a specific song
router.delete('/:id', function(req, res){
	//get id from the url parameters
	var id = req.params.id;

	//check that the right id is being used
	// console.log(id);
	// console.log(mongoose.Types.ObjectId(id)); //mongoose saves id's as an object

	//Delete the specific song
	Song.remove({_id: mongoose.Types.ObjectId(id)}, function(err){
		if(err){console.log(err);}

		res.send('Song Deleted');
	});
});

//export Song Controller
module.exports = router;












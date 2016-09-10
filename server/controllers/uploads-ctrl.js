//Uploads Server Controller

var multer = require('multer'); //dependency
var mongoose = require('mongoose'); //dependency
var express = require('express'); //dependency

var Chord = require('../models/index').Chord; //Schema/Model
var router = express.Router(); //router init

//Multer set up. tell multer where to store file and what the file name will be after saved.
var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, './uploads/')
	},
	filename: function(req, file, cb){
		var uploadDate = Date.now(); //used to help create uniqueness in filename
		cb(null, file.fieldname + '-' + uploadDate + '-' + file.originalname);
	}
});

//upload init
var upload = multer({storage: storage}).single('file');

//---------------
//	Routes
//---------------
//add file path to a chord obj
router.post('/', upload, function(req, res){
	var chordId = req.body.chordId; //which chord image file is to be saved to
	var filePath = req.file.path;	//what the path to the file is

	//check to make sure right values are being used
	// console.log('chordId: ' + chordId);
	// console.log('filePath: ' + filePath);

	//find the proper chord to save file too
	Chord.findById(chordId, function(err, chordData){
		if(err){
			console.log(err);
		}

		var chord = chordData; //response results from findById
		chord.diagram_image = filePath;	//save file path to the returned chords diagram_image field

		//save the new chord with the diagram_image field updated.
		chord.save(function(err){
			if(err){
				console.log('Failed to save');
				res.json({status: 500});
			}else{
				console.log('Save Successful');
				res.json({status: 200});
			}
		});
	});
});

//export uploads controller
module.exports = router;











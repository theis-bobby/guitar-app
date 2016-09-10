//Chords Schema

'use strict';

var mongoose = require('mongoose');

var ChordSchema = new mongoose.Schema({
	//json format for data entering, can be copied and pasted into mongo for data entry
	//try not to use and and use the add chord link on the front end. this schema doesn't include diagram_image
	// {
	// 	name: "C major",
	// 	fingering: [
	// 			{
	// 			sixth : {
	// 				fret : "x",
	// 				finger: "x"
	// 			},
	// 			fifth : {
	// 				fret : "3",
	// 				finger: "3"
	// 			},
	// 			fourth : {
	// 				fret : "2",
	// 				finger: "2"
	// 			},
	// 			third : {
	// 				fret : "0",
	// 				finger: "0"
	// 			},
	// 			second : {
	// 				fret : "1",
	// 				finger: "1"
	// 			},
	// 			first : {
	// 				fret : "0",
	// 				finger: "0"
	// 			}
	// 		}
	// 	]
	// }

	//actual schema
	name : { 
		type: String 
	},
	fingering : [{
		sixth: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		},
		fifth: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		},
		fourth: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		},
		third: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		},
		second: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		},
		first: {
			fret : {type: String, default: 'x'},
			finger : {type: String, default: 'x'}
		}
	}],
	diagram_image: {}

	//potential schema idea, i think the one above might be better because that one will always
	//gaurntee that each string is accounted for, and users cant enter more than 6 strings
	// name : String,
	// fingering : [{
	// 	fret : {type: String, default: 'x'},
	// 	finger : {type: String, default: 'x'}
	// }],
	// diagram_image: String
});

//export the Chord model to be used in other files, and tell it to use the ChordSchema
module.exports = mongoose.model('Chords', ChordSchema);




















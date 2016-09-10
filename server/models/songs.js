//Song Schema

'use strict';

var mongoose = require('mongoose');

var SongSchema = new mongoose.Schema({

	//JSON format for db insert, can be copy and pasted into mongo shell
	// {
	// 	title: "Test Song",
	// 	section: [
	// 		{
	// 			part: "Chorus",
	// 			progression: ["Am", "G", "C"]
	// 		},
	// 		{
	// 			part: "Chorus",
	// 			progression: ["C", "D"]
	// 		}
	// 	]
	// }

	//actual schema
	title : {type: String},
	section: [
		{
			part:{type: String},
			progression: {type: String}
		}
	],
	isEditing: {type: Boolean, default: false}
});

//export the Songs model to be used in other files, and tell it to use the SongSchema
module.exports = mongoose.model('Songs', SongSchema)




















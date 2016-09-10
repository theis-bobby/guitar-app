//this file creates myApp variable and configures it.

//create angular app.
//ngRoute comes from angular-route that we installed with npm
var myApp = angular.module('myApp', ['ngRoute', 'ngFileUpload']);

//configure routes and set the controllers for each route
myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller: 'ChordsCtrl',
		templateUrl: 'views/home/home.html'
	})
	.when('/chords', {
		controller: 'ChordsCtrl',
		templateUrl: 'views/chords/chords.html'
	})
	.when('/chords/add', {
		controller: 'ChordsCtrl',
		templateUrl: 'views/chords/chord-add.html'
	})
	.when('/chord/:id', {
		controller: 'ChordsCtrl',
		templateUrl: 'views/chords/chord.html'
	})
	.when('/songs', {
		controller: 'SongsCtrl',
		templateUrl: 'views/songs/songs.html'
	})
	.when('/songs/add', {
		controller: 'SongsCtrl',
		templateUrl: 'views/songs/song-add.html'
	})
	.when('/songs/:id', {
		controller: 'SongsCtrl',
		templateUrl: 'views/songs/song.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});
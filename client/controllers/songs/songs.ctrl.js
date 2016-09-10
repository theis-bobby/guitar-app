//decalre the myApp module that was declared in app.js
var myApp = angular.module('myApp');

//declare the SongsCtrl and set up
myApp.controller('SongsCtrl', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	//---------------
	//VARIABLES
	//---------------
	$scope.count = 0; //counter variable
	//song schema data enter
	//not used anywhere yet
	$scope.songData = {
		title : String,
		section: []
	};

	//---------------
	//CRUD OPERATIONS
	//---------------
	//get all songs
	$scope.getSongs = function(){
		//send get request to api to get all songs
		$http.get('/api/songs').success(function(response){
			//save song objects to scope
			$scope.songList = response;
		});
	}

	//get 1 song
	$scope.getSong = function(){
		//get the id from url paramater
		var id = $routeParams.id;

		//send get request to api with song id
		$http.get('/api/songs/'+id).success(function(response){
			//check response resullts
			//console.log(response);

			//save the entire song object
			$scope.song = response;
			//save just the song objects section objects
			$scope.sections = response.section;
		});
	}

	//add a new song
	$scope.addSong = function(){
		//variables
		var sectionProgArray = [];
		var sectionLength = Object.keys($scope.song.section).length;

		//loop through the chord progression (a string) and split it into an array.
		//this can be put into a function and needs to be improved to handle bad/weird input 
		for(var i = 0; i < sectionLength; i++){
			sectionProgArray.push($scope.song.section[i].progression.split(" "));
			$scope.song.section[i].progression = sectionProgArray[i];
		}

		//initialize data object that is to be sent to sever for saving
		var data = {
			title : $scope.song.title,
			section: []
		};

		//push each of the songs section objects into the data section array
		for(var i = 0; i < sectionLength; i++){
			data.section.push($scope.song.section[i]);
		}

		//check data format is correct
		console.log(data);

		//send request to save song
		$http.post('/api/songs', data).success(function(response){
			//send user to all songs home page
			window.location.href = '#/songs';
		});
	}

	//update a song
	$scope.updateSong = function(section){
		//check section object's format
		//console.log(section);

		//get songId from url param
		var songId = $routeParams.id;
		//get the sectionId from the section object being passed
		var sectionId = section._id;

		//send a put request to api to update a song's section
		//songId and sectionId are put in the url to know which song and which section in that song to update
		$http.put('/api/songs/' + songId + '/' + sectionId, section)
			.success(function(response){
				//refresh window so updates show up
				window.location.href='#/songs/'+songId;
			});

		//call toggle to switch the section off of editing mode
		$scope.toggle(section);
	}

	//delete song
	$scope.removeSong = function(id){
		//check we have the right id
		//console.log(id);

		//send delete request to server
		$http.delete('/api/songs/' + id).success(function(response){
			//get a new list of the songs with the deleted one gone
			$scope.getSongs();
		});
	}

	//toggle function to switch between editing mode and plain view
	$scope.toggle = function(section){
		section.isEditing = !section.isEditing;
	}

	//init
	$scope.songList = $scope.getSongs();
}]);


//Angular Directives
myApp.directive("testDirective", function(){
	return {
		template: 'this is from test directive'
	}
});

myApp.directive("addSongSectionButton", function(){
	return {
		restrict: "E",
		template: "<button type='button' class='btn btn-default' add-song-section>Click to add another section</button>"
	}
})
.directive("addSongSection", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.count++;

			angular.element(document.getElementById('form-group-append')).append($compile("\
				<div class='form-group'>\
                    <label>Section</label>\
                    <input type='text' class='form-control' ng-model='song.section["+scope.count+"].part' placeholder='Section Title'>\
                    <input type='text' class='form-control' ng-model='song.section["+scope.count+"].progression' placeholder='Section Progression'>\
                </div>\
			")(scope));
		});
	};
})
.directive('backButton', ['$window', function($window) {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.bind('click', function () {
                $window.history.back();
            });
        }
    };
}]);
// this code is unrlated to project, was using for reference
// .directive("changeToInput", function())

// app.directive("myWidget", function() {
//   var linkFunction = function(scope, element, attributes) {
//     var paragraph = element.children()[0];
//     $(paragraph).on("click", function() {
//       $(this).css({ "background-color": "red" });
//     });
//   };

//   return {
//     restrict: "E",
//     link: linkFunction
//   };
// });










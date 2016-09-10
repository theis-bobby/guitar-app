var myApp = angular.module('myApp');

//declare ChordsCtrl and set up
myApp.controller('ChordsCtrl', ['$scope', '$http', '$location', '$routeParams', 'multipartForm', 'Upload',
	function($scope, $http, $location, $routeParams, multipartForm, Upload){

		//---------------
		//CRUD OPERATIONS
		//---------------

		//get all chords
		$scope.getChords = function(){
			//send get request to api for all the chords
			$http.get('/api/chords').success(function(response){
				//save response objects to scope
				$scope.chordList = response;
			});
		}

		//function not complete: get request needs to be finished and save proper info to scope
		//get a single chord
		$scope.getChord = function(){
			//get id from url params
			var id = $routeParams.id;

			//send get request to api
			$http.get('/api/chords/'+id).success(function(response){
				//check the response object is correct
				console.log(response);
			});
		}

		//add a new chord
		$scope.addChord = function(){
			//data object to be manipulated, sent to api and saved
			var data = {
				name: $scope.chord.name,
				fingering: [{
					sixth: 
					{
						fret: $scope.chord.fingering[0].sixth.fret,
						finger: $scope.chord.fingering[0].sixth.finger
					},
					fifth: 
					{
						fret: $scope.chord.fingering[0].fifth.fret,
						finger: $scope.chord.fingering[0].fifth.finger
					},
					fourth: 
					{
						fret: $scope.chord.fingering[0].fourth.fret,
						finger: $scope.chord.fingering[0].fourth.finger
					},
					third: 
					{
						fret: $scope.chord.fingering[0].third.fret,
						finger: $scope.chord.fingering[0].third.finger
					},
					second: 
					{
						fret: $scope.chord.fingering[0].second.fret,
						finger: $scope.chord.fingering[0].second.finger
					},
					first: 
					{
						fret: $scope.chord.fingering[0].second.fret,
						finger: $scope.chord.fingering[0].second.finger
					}
				}],
			};

			//send a post request to the api
			$http.post('/api/chords', data).success(function(response){
				//check the data
				//console.log($scope.file);
				//console.log(response.resultId);
				
				//after chord is saved, the id created is sent back in a response then the 
				//chord diagram image added to the newly saved chord in the database
				$scope.upload($scope.file, response.resultId);

				//
				//window.location.href = '#/chords/add';
			});
		}

		//delete a chord
		$scope.removeChord = function(id){
			console.log(id);
			$http.delete('/api/chords/' + id).success(function(response){
				$scope.getChords();
			});
		}

		//scope might be able to be removed from this and made into just a function, or put into a service?
		//upload and save the file
		$scope.upload = function(file, chordId){
			//check data
			//console.log('chordId from chords.ctrl: ' + chordId);
			
			//if a file exits then try to upload to the api
			if(file){
				Upload.upload({
					url: '/api/uploads',
					method: 'POST',
					data: {chordId: chordId},
					file: file
				})
				.progress(function(){
					console.log('firiing');
				})
				.success(function(data){
					console.log(data);
				})
				.error(function(error){
					console.log(error);
				});
			}
		};

		//---------------
		//INITS
		//--------------- 
		$scope.chords = $scope.getChords();

}]);

//directives
myApp.directive("chordDiagram", function(){
	//providers, services, directives
	return {
		priority: 2001,
		scope: {
			chordInfo: "=info"
		},
		templateUrl: "/../views/chords/chord-diagram.html"
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












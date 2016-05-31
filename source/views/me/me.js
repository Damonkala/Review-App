'use strict';

angular.module('scaffoldApp')
.controller('meCtrl', function($scope, $auth, $http, $state, Upload){
	if(!$auth.isAuthenticated()){
		return $state.go('home');
	}

	$scope.submit = () => {
		upload($scope.file);
	};

	$scope.upload = files => {
		upload(files[0]);
	};
	function upload(file) {
		Upload.upload({
			url: '/books',
			data: { newFile: file }
		})
		.then(res => {
			console.log('res:', res);
		})
		.catch(err => {
			console.log('err:', err);
		})
	}
	$scope.addBook = function(bookInfo){
		var book = bookInfo;
		book.author = $scope.user.id;
		$http.post('books/', book)
		.then(function(res) {
			$scope.init();
		})
	}
	$scope.init = function(){
		$http.get('/authors/me')
		.then(function(res) {
			console.log(res.data);
			$scope.user = res.data;
		}, function(err) {
			console.error(err);
		});
	}
	$scope.acceptRequest = function(message, request){

		var response = {};

		response.reciever = request.sender;
		response.sender = request.reciever;
		response.message = message;
		response.book = request.book;
		response.requestID = request.id;

		$http.post('/authors/acceptRequest', response)
		.then(function(res){
			console.log(res);
			$scope.init();
		})
	}
	$scope.init();
})

'use strict';

angular.module('scaffoldApp')
.controller('authorPageCtrl', function($scope, $auth, $http, $state){
 console.log("id", $state.params.id);
 $http.get(`/authors/profilePage/${$state.params.id}`)
 .then(function(res){
	 $scope.author = res.data;
	 console.log($scope.author);
 })
 $scope.openBook = function(book){
 	$state.go('bookPage', {id: book});
 }
 $scope.sendRequest = function(requestInfo, book){
	 var requestObj = requestInfo;
	 requestObj.reciever = $state.params.id;
	 requestObj.book = book;
	 $http.post('/authors/sendRequest', requestObj)
	 .then(function (res) {
	 	console.log(res);
	 })
 }
})

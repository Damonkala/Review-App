'use strict';

angular.module('scaffoldApp')
.controller('authorPageCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
 $http.get('/authors/profilePage', $state.params.id)
 .then(function(res){
	 $scope.author = res.data;
 })

$scope.magicButton = function(){
	$http.get('/authors/findMe')
	.then(function(res){
		console.log(res);
	})
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
'use strict';

angular.module('scaffoldApp')
.controller('meCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
$scope.addBook = function(bookInfo){
	// console.log("Book Info: ", bookInfo);
	$http.post('books/', bookInfo)
	.then(function(res) {
		console.log("YES DOCTOR ", res);
	})
}
 $http.get('/authors/me')
 .then(function(res) {
	 $scope.user = res.data;
	 console.log('res:', res);
 }, function(err) {
	 console.error(err);
 });
})

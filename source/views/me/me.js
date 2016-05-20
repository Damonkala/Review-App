'use strict';

angular.module('scaffoldApp')
.controller('meCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
$scope.addBook = function(bookInfo){
	var book = bookInfo;
	book.author = $scope.user.id;
	console.log(book);
	$http.post('books/', book)
	.then(function(res) {
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

'use strict';

angular.module('scaffoldApp')
.controller('authorsListCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
$scope.openProfile = function(author){
	$state.go('authorPage', {id: author});
}
 $http.get('/authors/list')
 .then(function(res) {
	 $scope.authorlist = res.data;
 }, function(err) {
	 console.error(err);
 });
})

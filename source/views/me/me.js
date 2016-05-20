'use strict';

angular.module('scaffoldApp')
.controller('meCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }

 $http.get('/authors/me')
 .then(function(res) {
	 $scope.user = res.data;
	 console.log('res:', res);
 }, function(err) {
	 console.error(err);
 });
})

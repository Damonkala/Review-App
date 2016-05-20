'use strict';

angular.module('scaffoldApp')
.controller('homeCtrl', function($scope, $auth){
	console.log('homeCtrl');
	$scope.authenticate = function(provider) {
		 $auth.authenticate(provider);
	 };
})

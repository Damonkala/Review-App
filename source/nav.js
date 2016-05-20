'use strict';

angular.module('scaffoldApp')
.controller('navCtrl', function($scope, $auth, $state) {

  $scope.isAuthenticated = function(){
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
    $state.go('home');
  };

});

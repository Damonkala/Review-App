'use strict';

var app = angular.module('scaffoldApp', ['ui.router', 'satellizer'])


.config(function($stateProvider, $urlRouterProvider, $locationProvider, $authProvider){
	$authProvider.facebook({
		clientId: "133613137049629"
	});

	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('home', {url: '/', templateUrl: 'views/home/home.html', controller: 'homeCtrl'})
	.state('authorsList', {url: '/authorsList', templateUrl: 'views/authorsList/authorsList.html', controller: 'authorsListCtrl'})
	.state('me', {url: '/me', templateUrl: 'views/me/me.html', controller: 'meCtrl'})
	.state('authorPage', {url: '/authorPage/:id', templateUrl: 'views/authorPage/authorPage.html', controller: 'authorPageCtrl'})
})

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
  $scope.authenticate = function(provider) {
		 $auth.authenticate(provider);
	 };
});

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

 $scope.sendRequest = function(requestInfo, book){
	 var requestObj = requestInfo;
	 requestObj.reciever = $state.params.id;
	 requestObj.book = book;
	 console.log(requestObj);
 }
})

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

'use strict';

angular.module('scaffoldApp')
.controller('homeCtrl', function($scope, $auth){
	console.log('homeCtrl');
	$scope.authenticate = function(provider) {
		 $auth.authenticate(provider);
	 };
})

'use strict';

angular.module('scaffoldApp')
.controller('meCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
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
		$scope.user = res.data;
	}, function(err) {
		console.error(err);
	});
}
$scope.init();
})

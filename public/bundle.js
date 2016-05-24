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
	.state('booksList', {url: '/booksList', templateUrl: 'views/booksList/booksList.html', controller: 'booksListCtrl'})
	.state('me', {url: '/me', templateUrl: 'views/me/me.html', controller: 'meCtrl'})
	.state('authorPage', {url: '/authorPage/:id', templateUrl: 'views/authorPage/authorPage.html', controller: 'authorPageCtrl'})
	.state('bookPage', {url: '/bookPage/:id', templateUrl: 'views/bookPage/bookPage.html', controller: 'bookPageCtrl'})
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
 console.log("id", $state.params.id);
 $http.get('/authors/profilePage', $state.params.id)
 .then(function(res){
	 $scope.author = res.data;
 })

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
.controller('bookPageCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
 console.log("id", $state.params.id);
 $http.get(`/books/bookPage/${$state.params.id}`)
 .then(function(res){
	 $scope.book = res.data;
	 console.log($scope.book);
 })
})

'use strict';

angular.module('scaffoldApp')
.controller('booksListCtrl', function($scope, $auth, $http, $state){
	if(!$auth.isAuthenticated()){
	 return $state.go('home');
 }
$scope.openBook = function(book){
	$state.go('bookPage', {id: book});
}
 $http.get('/books/list')
 .then(function(res) {
	 $scope.booklist = res.data;
	 console.log($scope.booklist);
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

'use strict';

var app = angular.module('scaffoldApp', ['ui.router', 'satellizer', 'oitozero.ngSweetAlert'])


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

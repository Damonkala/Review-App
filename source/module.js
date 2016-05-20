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
})

'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
	'ngRoute',
	'ngSanitize',
	'mainApp.blog',
	'mainApp.post',
	'postServices'
]).
	config(['$routeProvider', '$locationProvider', '$interpolateProvider', function($routeProvider, $locationProvider, $interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}])
	.controller('MainCtrl', ['$scope', '$location', 'PostCategory', function($scope, $location, PostCategory) {
		$scope.categories = PostCategory.query();
	}]);

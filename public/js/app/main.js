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
	.controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
		$scope.curr_title = tabs[0].title;

		$scope.go = function(tab, path) {
			$scope.curr_title = tab.title;
			$location.path(path);
		};
	}]);

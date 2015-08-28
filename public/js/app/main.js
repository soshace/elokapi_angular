'use strict';

// Declare app level module which depends on views, and components
angular.module('mainApp', [
	'ngRoute',
	'ngSanitize',
	'mainApp.blog',
	'mainApp.post',
	'mainApp.directives',
	'postServices'
]).
	config(['$routeProvider', '$locationProvider', '$interpolateProvider', '$compileProvider', function($routeProvider, $locationProvider, $interpolateProvider, $compileProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|whatsapp):/);
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}])
	.controller('MainCtrl', ['$scope', '$location', 'PostCategory', function($scope, $location, PostCategory) {
		$scope.categories = PostCategory.query();
	}]);

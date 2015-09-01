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
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', 'PostCategory', function($scope, $rootScope, $location, PostCategory) {
		var categories = PostCategory.query();
		
		$scope.categories = categories;
		$rootScope.categories = categories;
		
	}]);

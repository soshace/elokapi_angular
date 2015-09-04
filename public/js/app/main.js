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
	.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$timeout', 'PostCategory', function($scope, $rootScope, $location, $timeout, PostCategory) {
		PostCategory.query(function (categories) {
			$rootScope.categories = categories;
			initResponsiveMenu();
		});
	}]);

function initResponsiveMenu() {
	var navigationMenu = responsiveNav(".nav-collapse", { // Selector
		animate: true, // Boolean: Use CSS3 transitions, true or false
		transition: 284, // Integer: Speed of the transition, in milliseconds
		label: "", // String: Label for the navigation toggle
		insert: "before", // String: Insert the toggle before or after the navigation
		customToggle: "", // Selector: Specify the ID of a custom toggle
		closeOnNavClick: false, // Boolean: Close the navigation when one of the links are clicked
		openPos: "relative", // String: Position of the opened nav, relative or static
		navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
		navActiveClass: "js-nav-active", // String: Class that is added to <html> element when nav is active
		jsClass: "js", // String: 'JS enabled' class which is added to <html> element
		init: function () {},
		open: function () {}, // Function: Open callback
		close: function () {} // Function: Close callback
	});
  
	jQuery('.nav-collapse').on('click', 'a', function () {
		navigationMenu.close();
	});
}

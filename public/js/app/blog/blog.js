'use strict';

angular.module('mainApp.blog', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/category/:key', {
			templateUrl: '/views/blog' + template_ext,
			controller: 'HomeCtrl',
			reloadOnSearch: false
		})

			.when('/', {
				templateUrl: '/views/blog' + template_ext,
				controller: 'HomeCtrl',
				reloadOnSearch: false
			});
	}])

	.controller('HomeCtrl', ['Post', 'PostByCategory', '$routeParams', '$scope', function(Post, PostByCategory, $routeParams, $scope) {
		$scope.posts = [];

		if ($routeParams.key != null)
			$scope.posts = PostByCategory.query({key: $routeParams.key});
		else
			$scope.posts = Post.query();
	}]);


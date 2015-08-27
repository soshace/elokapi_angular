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

	.controller('HomeCtrl', ['Post', 'PostByCategory', '$routeParams', '$scope', 'PostUtils', function(Post, PostByCategory, $routeParams, $scope, PostUtils) {
		$scope.posts = [];
		if ($routeParams.key != null)
			PostByCategory.query({key: $routeParams.key}, PostsSuccessFn);
		else
			Post.query(PostsSuccessFn);

		function PostsSuccessFn(data) {
			$scope.posts = data;
			PostUtils.setTimeAgo($scope.posts);
		}
	}]);


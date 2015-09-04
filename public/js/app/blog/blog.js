'use strict';

angular.module('mainApp.blog', ['ngRoute', 'infinite-scroll'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/category/:key', {
			templateUrl: '/views/blog' + template_ext,
			controller: 'HomeCtrl',
			reloadOnSearch: false
		})

			.when('/', {
				templateUrl: '/views/blog' + template_ext,
				controller: 'HomeCtrl',
				reloadOnSearch: false
			}).
			otherwise({
				redirectTo: '/'
			});
	}])

	.controller('HomeCtrl', ['Post', 'Posts', 'PostByCategory', '$routeParams', '$scope', 'PostUtils', '$rootScope', function (Post, Posts, PostByCategory, $routeParams, $scope, PostUtils, $rootScope) {
		var skip,
			limit,
			inc;

		$scope.posts = [];
		$scope.busyLoading = true;
		$rootScope.href = window.location.href;

		activate();

		$scope.loadMore = function () {
			if (!$scope.busyLoading) {
				$scope.busyLoading = true;
				Posts.query({skip: skip, limit: limit, categoryKey: $routeParams.key}, LoadMoreSuccessFn);
			}
		};

		function activate() {
			initInc();
			setDocumentTitle();
			Posts.query({skip: skip, limit: limit, categoryKey: $routeParams.key}, PostsSuccessFn);
		}

		function initInc() {
			skip = 0;
			limit = 9;
			inc = 9;
		}

		function setDocumentTitle() {
			var key = $routeParams.key;

			if (key) {
				$rootScope.documentTitle = 'Category ' + key;
				return;
			}

			$rootScope.documentTitle = 'Elokapi site';
		}

		function LoadMoreSuccessFn(data) {
			data.forEach(function (post) {
				PostUtils.setTimeAgo(post);
				$scope.posts.push(post);
			});
			skip += inc;
			$scope.busyLoading = false;
		}

		function PostsSuccessFn(data) {
			$scope.posts = data;
			PostUtils.setTimeAgo($scope.posts);
			skip += inc;
			$scope.busyLoading = false;
			PostUtils.onPageLoad();
		}
	}]);


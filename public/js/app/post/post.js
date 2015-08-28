'use strict';

angular
	.module('mainApp.post', ['ngRoute', 'mainApp.directives'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/post/:slug', {
			templateUrl: '/views/post' + template_ext,
			controller: 'PostCtrl'
		});
	}])
	.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$routeParams', '$rootScope', '$scope', 'Post', 'PostsRecent', 'PostUtils'];

function PostCtrl($routeParams, $rootScope, $scope, Post, PostsRecent, PostUtils) {
	Post.get({slug: $routeParams.slug}, function(post) {
		$rootScope.documentTitle = post.title;
		PostUtils.setTimeAgo(post);
		post.watsAppLink = 'whatsapp://' + post.title + ' : ' + location.href;
		$scope.post = post;
		PostsRecent.query({key: post.categories[0].key}, function(recentPosts) {
			PostUtils.setTimeAgo(recentPosts);
			$scope.recentPosts = recentPosts;
			PostUtils.addAdsense($('article'));
		}, ErrorFn);
		
	}, ErrorFn);
	
	function ErrorFn(error) {
		console.error(error);
	}
}

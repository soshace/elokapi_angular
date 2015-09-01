'use strict';

angular
	.module('mainApp.post', ['ngRoute', 'mainApp.directives', 'ngSanitize'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/post/:slug', {
			templateUrl: '/views/post' + template_ext,
			controller: 'PostCtrl'
		});
	}])
	.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$sce', '$routeParams', '$rootScope', '$scope', 'Post', 'PostsRecent', 'PostUtils'];

function PostCtrl($sce, $routeParams, $rootScope, $scope, Post, PostsRecent, PostUtils) {
	Post.get({slug: $routeParams.slug}, function (post) {
		$rootScope.documentTitle = post.title;
		PostUtils.setTimeAgo(post);
		post.watsAppLink = 'whatsapp://' + post.title + ' : ' + location.href;
		$scope.post = post;
		$scope.post.content.extended = $sce.trustAsHtml($scope.post.content.extended);
		$scope.post.content.brief = $sce.trustAsHtml($scope.post.content.brief);
		PostsRecent.query({key: post.categories[0].key}, function (recentPosts) {
			PostUtils.setTimeAgo(recentPosts);
			$scope.recentPosts = recentPosts;
			PostUtils.addAdsense($('article'));
		}, ErrorFn);

	}, ErrorFn);

	$scope.shareFacebook = function () {
		var post = $scope.post;
		if (FB) {
			FB.ui(
				{
					method: 'share',
					href: window.location.href,
					title: post.title,
					picture: (!!post.image) ? post.image.url : "",
					description: "Por el Amor A Los Animales. Únete Para Protegerlos."
				});
		}
	};
	function ErrorFn(error) {
		console.error(error);
	}
}

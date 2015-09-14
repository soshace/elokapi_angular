'use strict';

angular
	.module('mainApp.post', ['ngRoute', 'mainApp.directives', 'ngSanitize'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/post/:slug', {
			templateUrl: '/views/post' + template_ext,
			controller: 'PostCtrl'
		})
			.otherwise({
				redirectTo: '/'
			})
		;
	}])
	.controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$sce', '$routeParams', '$rootScope', '$scope', 'Post', 'PostsRecent', 'PostUtils'];

function PostCtrl($sce, $routeParams, $rootScope, $scope, Post, PostsRecent, PostUtils) {
	Post.get({slug: $routeParams.slug}, function (post) {
		$rootScope.documentTitle = post.title;
		PostUtils.setTimeAgo(post);
		$scope.post = post;
		$scope.post.whatsappLink = 'whatsapp://send?text=' + $scope.post.title + ' : ' + window.location.href;
		$scope.post.content.extended = $sce.trustAsHtml($scope.post.content.extended);
		$scope.post.content.brief = $sce.trustAsHtml($scope.post.content.brief);
		$scope.currentUrl = window.location.href;
		PostsRecent.query({key: post.categories[0].key}, function (recentPosts) {
			PostUtils.setTimeAgo(recentPosts);
			recentPosts = recentPosts.filter(function (item) {
				return !(item._id == post._id);
			});
			$scope.recentPosts = recentPosts;
			PostUtils.addAdsense($('article'));
			PostUtils.onPostRender();
			PostUtils.onPageLoad();
		}, ErrorFn);

	}, ErrorFn);
	$rootScope.shareFacebook = function () {
		var post = $scope.post;
		$rootScope.imageUrl = post.image.url;
		if (FB) {
			FB.ui(
				{
					name: post.title,
					method: isMobile() ? 'feed' : 'share',
					href: window.location.href,
					link:window.location.href,
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

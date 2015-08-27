'use strict';

angular
  .module('mainApp.post', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/post/:slug', {
      templateUrl: '/views/post' + template_ext,
      controller: 'PostCtrl'
    });
  }])
  .controller('PostCtrl', PostCtrl);

PostCtrl.$inject = ['$routeParams', '$location', '$scope', 'Post', 'PostsRecent', 'PostUtils'];

function PostCtrl($routeParams, $location, $scope, Post, PostsRecent, PostUtils) {
  activate();
  
  function activate() {
    Post.get({slug: $routeParams.slug}, function (post) {
      $scope.post = post;

      PostsRecent.query({key: post.categories[0].key}, function (recent_posts) {
        PostUtils.setTimeAgo(recent_posts);
        $scope.recent_posts = recent_posts;
      }, ErrorFn);
    }, ErrorFn);
  }

  function ErrorFn(error) {
    console.error(error);
  }
}

'use strict';

angular.module('mainApp.post', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/post/:slug', {
      templateUrl: '/views/post' + template_ext,
      controller: 'PostCtrl'
    });
  }])

  .controller('PostCtrl', ['$routeParams', '$location', '$scope', 'Post', 'PostByCategory', function ($routeParams, $location, $scope, Post, PostByCategory) {
    function activate() {
      Post.get({slug: $routeParams.slug}, function (post) {
        $scope.post = post;
        
        PostByCategory.query({key: post.categories[0].key}, function (recent_posts) {
          $scope.recent_posts = recent_posts;
        }, ErrorFn);
      });
    }
    activate();

    function ErrorFn(error) {
      console.error(error);
    }
  }]);

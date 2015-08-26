'use strict';

angular.module('mainApp.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post/:slug', {
    templateUrl: '/views/post' + template_ext,
    controller: 'PostCtrl'
  });
}])

.controller('PostCtrl', ['$routeParams', '$location', '$scope', 'Post', function($routeParams, $location, $scope, Post) {
  var self = this;

  Post.get({slug: $routeParams.slug}, function(post) {
    self.post = post;
  });
}]);

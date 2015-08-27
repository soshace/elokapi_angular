'use strict';

angular.module('mainApp.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post/:slug', {
    templateUrl: '/views/post' + template_ext,
    controller: 'PostCtrl',
	controllerAs: 'postctrl'
  });
}])

.controller('PostCtrl', ['$routeParams', '$location', '$scope', 'Post', function($routeParams, $location, $scope, Post) {
  Post.get({slug: $routeParams.slug}, function(post) {
    $scope.post = post;
  });
}]);

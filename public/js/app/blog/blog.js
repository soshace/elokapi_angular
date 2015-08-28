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
      });
  }])

  .controller('HomeCtrl', ['Post', 'Posts', 'PostByCategory', '$routeParams', '$scope', 'PostUtils', function (Post, Posts, PostByCategory, $routeParams, $scope, PostUtils) {
    var skip,
      limit,
      inc,
      busyLoading = true
      ;

    $scope.posts = [];

    activate();

    $scope.loadMore = function () {
      if (!busyLoading) {
        busyLoading = true;
        Posts.query({skip: skip, limit: limit, categoryKey: $routeParams.key}, LoadMoreSuccessFn);
      }
    };

    function activate() {
      initInc();
      Posts.query({skip: skip, limit: limit, categoryKey: $routeParams.key}, PostsSuccessFn);
    }

    function initInc() {
      skip = 0;
      limit = 6;
      inc = 6;
    }

    function LoadMoreSuccessFn(data) {
      data.forEach(function (post) {
        PostUtils.setTimeAgo(post);
        $scope.posts.push(post);
      });
      skip += inc;
      busyLoading = false;
    }

    function PostsSuccessFn(data) {
      $scope.posts = data;
      PostUtils.setTimeAgo($scope.posts);
      skip += inc;
      busyLoading = false;
    }
  }]);


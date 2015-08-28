'use strict';

var postServices = angular.module('postServices', ['ngResource']);

postServices.factory('Post', ['$resource',
  function($resource){
    return $resource(host + 'api/post/:slug', {}, {
      query: {method:'GET', params:{slug:'list'}, isArray:true}
    });
  }]);

postServices.factory('PostCategory', ['$resource',
  function($resource){
    return $resource(host + 'api/post-category/:key', {}, {
      query: {method:'GET', params:{key:'list'}, isArray:true}
    });
  }]);

postServices.factory('PostByCategory', ['$resource',
  function($resource){
    return $resource(host + 'api/post-by-category/:key', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

postServices.factory('PostsRecent', ['$resource',
  function($resource){
    return $resource(host + 'api/post-by-category-recent/:key', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);

postServices.factory('Posts', Posts);
Posts.$inject = ['$resource'];

postServices.factory('PostUtils', PostUtils);

function Posts($resource){
  return $resource(host + 'api/posts', {}, {
    query: {method:'GET', isArray:true}
  });
}

function PostUtils() {
  return {
    setTimeAgo: setTimeAgo
  };

  function setTimeAgo(posts) {
    var postTime;
    if (!(posts instanceof  Array)) {
      postTime = new Date(posts.publishedDate);
      posts.timeAgo = getMessageByHoursDiff(postTime);
      return;
    }
    posts.forEach(function (post, index, arr) {
      postTime = new Date(post.publishedDate);
      post.timeAgo = getMessageByHoursDiff(postTime);
    });
  }

  function getMessageByHoursDiff(postTime) {
    var res,
      MILLS_IN_HOUR = 1000 * 60 * 60,
      now = new Date(),
      YESTERDAY = new Date(now.getYear(), now.getMonth(), now.getDate() - 1),
      diff = now.getTime() - postTime.getTime(),
      hoursDiff = diff / MILLS_IN_HOUR
      ;

    if (hoursDiff < 0) {
      res = "In future";
    } else if (hoursDiff <= 1) {
      res = "Just now";
    } else if ((hoursDiff <= 48) && (postTime.getDate() == YESTERDAY.getDate())) {
      res = "Yesterday";
    } else if (hoursDiff <= now.getHours() + 24) {
      res = Math.floor(hoursDiff) + " hours ago";
    } else {
      res = Math.ceil(hoursDiff / 24) + " days ago";
    }
    return res;
  }
}
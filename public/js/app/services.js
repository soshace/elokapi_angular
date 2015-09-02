'use strict';

var postServices = angular.module('postServices', ['ngResource']);

postServices.factory('Post', ['$resource',
  function ($resource) {
    return $resource(host + 'api/post/:slug', {}, {
      query: {method: 'GET', params: {slug: 'list'}, isArray: true}
    });
  }]);

postServices.factory('PostCategory', ['$resource',
  function ($resource) {
    return $resource(host + 'api/post-category/:key', {}, {
      query: {method: 'GET', params: {key: 'list'}, isArray: true}
    });
  }]);

postServices.factory('PostByCategory', ['$resource',
  function ($resource) {
    return $resource(host + 'api/post-by-category/:key', {}, {
      query: {method: 'GET', isArray: true}
    });
  }]);

postServices.factory('PostsRecent', ['$resource',
  function ($resource) {
    return $resource(host + 'api/post-by-category-recent/:key', {}, {
      query: {method: 'GET', isArray: true}
    });
  }]);

postServices.factory('Posts', Posts);
Posts.$inject = ['$resource'];

postServices.factory('PostUtils', PostUtils);

function Posts($resource) {
  return $resource(host + 'api/posts', {}, {
    query: {method: 'GET', isArray: true}
  });
}

function PostUtils() {
  return {
    setTimeAgo: setTimeAgo,
    addAdsense: addAdsense,
		onPostRender: onPostRender
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

  function addAdsense($elem) {
    var $headers = $elem.find('h2, h3, h4, h5, h6'),
      BreakException = {},
		adSlots = ['2348713285', '3825446483', '5302179685'];

    try {
      $headers.each(function (index) {
        if (index === 3) throw BreakException; 
				$(this).after("<ins class='adsbygoogle' style='display:inline-block;width:336px;height:280px' data-ad-client='ca-pub-3833845702235676' data-ad-slot='"+adSlots[index]+"'></ins>");
				refreshAdsense();
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
  }

	function onPostRender() {
		var MIN_WIDTH = 768,
			width = (window.innerWidth < MIN_WIDTH) ? 'w_' + Math.round(window.innerWidth / 2) : null,
			src,
			tmpArr
			;

		$('iframe[src^="https://www.youtube.com"]').wrap('<div class="video-container"/>');
		$.each($('img[data-source]'), function () {
			tmpArr = $(this).data('source').split('/');
			if (width) {
				tmpArr.splice(tmpArr.length - 2, 0, width);
			}
			src = tmpArr.join('/');

			$(this).attr('src', src);
		});
	}
}

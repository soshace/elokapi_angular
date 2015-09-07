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
		onPostRender: onPostRender,
		onPageLoad: onPageLoad,
		toggleAdPanel: toggleAdPanel
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
				$(this).after("<ins class='adsbygoogle' style='display:inline-block;width:336px;height:280px' data-ad-client='ca-pub-3833845702235676' data-ad-slot='" + adSlots[index] + "'></ins>");
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
		$('a[title="resource"]').parent('p').addClass('wp-caption-text');
		$.each($('img[data-source]'), function () {
			tmpArr = $(this).data('source').split('/');
			if (width) {
				tmpArr.splice(tmpArr.length - 2, 0, width);
			}
			src = tmpArr.join('/');

			$(this).attr('src', src);
		});

	}

	function onPageLoad() {
		var
			scripts = [
				'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
			];

		if (!contentLoaded) {
			loadExtraContent('script', scripts);
			//injectFont();
			loadFacebookModules();
			contentLoaded = true;
		}

		function loadExtraContent(elemTag, content) {
			var elem = document.createElement(elemTag);
			content.forEach(function (link) {
				if (elemTag == 'script') {
					elem.src = link;
				} else if (elemTag == 'link') {
					elem.href = link;
				}
				document.getElementsByTagName('head')[0].appendChild(elem);
				console.log(link)
			});

		}

		function loadFacebookModules() {
			var iframe,
				src = "//www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fcircoviral&amp;width=147&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=21&amp;appId=" + 1609874635937523;

			(function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.4&appId=1609874635937523";
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			iframe = document.getElementById('likeButtonIframe');
			iframe.src = src;
		}
	}
	
	function toggleAdPanel(show) {
		var elems = $('body ins.adsbygoogle:not([data-ad-client])');
		if (show) {
			elems.show();
			elems.css('bottom', '0px');
		} else {
			elems.hide();
		}
	}

}

// Config params for the Angular App
var
	contentLoaded = false,
	template_ext = '.html',
	host = (function () {
		return '//' + location.host + '/';
	})();

function cv_share_window(oUrl, oService) {
	var w = 800;
	var h = 500;
	if (oService == "twitter") {
		w = 500;
		h = 300;
	}
	var left = (screen.width / 2) - (w / 2);
	var top = (screen.height / 2) - (h / 2);
	if (oService == "twitter") {
		window.open(oUrl, "cv_share_window", "height=300,width=500,resizable=1,scrollbars=yes,top=" + top + ",left=" + left);
	} else {
		window.open(oUrl, "cv_share_window", "height=500,width=800,resizable=1,scrollbars=yes,top=" + top + ",left=" + left);
	}
}

function get_total_views(post_ID) {
	jQuery.ajax({
		type: 'POST',
		headers: {"cache-control": "no-cache"},
		url: ajaxcounter.ajaxurl,
		cache: false,
		data: {
			action: 'cv_post_views_count',
			postid: post_ID
		},

		success: function (data, textStatus, XMLHttpRequest) {
			var counter_el = jQuery('.text-sharing');
			counter_el.html('');
			counter_el.append(data);
			console.log(data);
		},
		error: function (MLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}

jQuery(window).scroll(function (event) {
	if (jQuery(this).scrollTop() > 200) {
		jQuery('.static-share-header').css({
			transform: 'translateX(0px) translateY(0px)',
			transition: 'transform 500ms'
		});
	} else {
		jQuery('.static-share-header').css({
			transform: 'translateX(0px) translateY(-71px)',
			transition: 'transform 500ms'
		});
	}
});

function refreshAdsense() {
	(adsbygoogle = window.adsbygoogle || []).push({});
}


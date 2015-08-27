// Config params for the Angular App
var template_ext = '.html',
	host = (function() {
		return '//' + location.host + '/';
	})();

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.async = true;
	js.src = "//connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v2.3&appId=1609874635937523";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
		data: {action: 'cv_post_views_count', postid: post_ID},
		success: function(data, textStatus, XMLHttpRequest) {
			var counter_el = jQuery('.text-sharing');
			counter_el.html('');
			counter_el.append(data);
			console.log(data);
		},
		error: function(MLHttpRequest, textStatus, errorThrown) {
			console.log(errorThrown);
		}
	});
}

jQuery(window).scroll(function(event) {
	if (jQuery(this).scrollTop() > 200) {
		jQuery('.static-share-header').css({
			transform: 'translateX(0px) translateY(0px)',
			transition: 'transform 500ms'
		});
	} else {
		jQuery('.static-share-header').css({
			transform: 'translateX(0px) translateY(-56px)',
			transition: 'transform 500ms'
		});
	}
});

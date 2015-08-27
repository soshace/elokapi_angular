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

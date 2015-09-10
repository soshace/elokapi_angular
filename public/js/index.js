// Config params for the Angular App
var
	contentLoaded = false,
	template_ext = '.html',
	host = (function () {
		return '//' + location.host + '/';
	})(),
	firstLoad = true;

//jQuery(window).scroll(function (event) {
//	if (jQuery(this).scrollTop() > 200) {
//		jQuery('.static-share-header').css({
//			transform: 'translateX(0px) translateY(0px)',
//			transition: 'transform 500ms'
//		});
//	} else {
//		jQuery('.static-share-header').css({
//			transform: 'translateX(0px) translateY(-71px)',
//			transition: 'transform 500ms'
//		});
//	}
//});

function refreshAdsense() {
	(adsbygoogle = window.adsbygoogle || []).push({});
}
 
function addUnits() {
	(adsbygoogle = window.adsbygoogle || []).push({
		google_ad_client: "ca-pub-3833845702235676",
		enable_page_level_ads: true
	});
	console.log('units added');
	
}

$(document).on('click', 'a.google_vignette_inst', function (e) {
	console.log(this);
	e.preventDefault();
	return false;
});

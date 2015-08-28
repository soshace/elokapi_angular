'use strict';

angular.module('mainApp.directives', [])
	.directive('dynFbCommentBox', function () {
		function createHTML(href, numposts, colorscheme, width) {
			return '<div class="fb-comments" ' +
				'data-href="' + href + '" ' +
				'data-numposts="' + numposts + '" ' +
				'data-width="' + width + '" ' +
				'data-colorsheme="' + colorscheme + '">' +
				'</div>';
		}

		return {
			restrict: 'A',
			scope: {},
			link: function postLink(scope, elem, attrs) {
				attrs.$observe('pageHref', function (newValue) {
					var numposts    = attrs.numposts    || 5,
						colorscheme = attrs.colorscheme || 'light',
						width = attrs.width || '100%';

					elem.html(createHTML(newValue, numposts, colorscheme, width));
					FB.XFBML.parse(elem[0]);
				});
			}
		};
	});

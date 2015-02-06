/*global angular:false*/

(function(angular) {
angular.module('whoswhere.hideWeekends', [])

/**
 * The angular datepicker doesn't have many configuration points so
 * I've had to manually alter the appearance through this directive
 * and CSS to hide the weekends
 */
	.directive('hideWeekends', function() {
		function link($scope, $element) {
			$scope.$watch(
				function() { return $element[0].childNodes.length; },
				function () {
					$element.find('th[colspan=5]').attr('colspan', 3);
				}
			)
		}
		return {
			link: link
		};
	});
}(angular));
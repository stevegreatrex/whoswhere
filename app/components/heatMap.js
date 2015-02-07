/*global angular:false*/

(function(angular) {
	angular.module('whoswhere.heatMap', [])

		.directive('heatMap', function() {
			function link($scope, $element) {
				var value = $scope.heatMap || 0;
				var max = $scope.heatMapMax || 10;
				var opacity = value / max;

				$element.css('background-color', 'rgba(128,21,21,' + opacity + ')');
				$element.css('color', opacity > 0.7 ? '#eee' : '#222');
			}
			return {
				link: link,
				restrict: 'A',
				scope: {
					heatMapMax: '=',
					heatMap: '='
				}
			};
		});
}(angular));
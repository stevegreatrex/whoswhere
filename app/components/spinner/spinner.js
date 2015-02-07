/*global angular:false*/

(function(angular) {
	angular.module('whoswhere.spinner', [])

		.directive('spinner', function() {
			return {
				templateUrl: '/app/components/spinner/spinner.html',
				scope: {
					spinning: '=for'
				}
			}
		});
}(angular));
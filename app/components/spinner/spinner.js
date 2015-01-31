/*global angular:false*/

(function(angular) {
angular.module('whoswhere.spinner', [])

    .directive('spinner', function() {
        return {
            controller: 'DaySummaryCtrl',
            templateUrl: '/app/components/spinner/spinner.html',
            scope: {
                spinning: '=for'
            }
        }
    });
}(angular));
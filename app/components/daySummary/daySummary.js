/*global angular:false*/

(function(angular) {
angular.module('whoswhere.daySummary', ['whoswhere.absenceApi'])

    .controller('DaySummaryCtrl', ['$scope', 'moment', 'absenceApi', function ($scope, moment, absenceApi) {
        $scope.format = 'dd MMM yyyy';
        $scope.date = new Date();
        $scope.dateOptions = {
            formatYear: 'yyyy',
            formatDay: 'd',
            startingDay: 1,
            showButtonBar: false,
            showWeeks: false
        };

        $scope.update = function() {
            $scope.loading = true;
            absenceApi.getAbsencesOnDate(moment($scope.date).format())
                .then(function (daySummary) {
                    $scope.loading = false;
                    $scope.data = daySummary;
                });
        }

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        // Disable weekend selection
        $scope.disabled = function(date, mode) {
            return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };

        $scope.today = function() {
            $scope.date = new Date();
            $scope.update();
        };

        $scope.changeDay = function(offset) {
            $scope.date = moment($scope.date).add(offset, 'days').toDate()
            $scope.update();
        };

        $scope.update();
    }])

    .directive('daySummaryList', function() {
        return {
            controller: 'DaySummaryCtrl',
            templateUrl: '/app/components/daySummary/day-summary-list.html'
        }
    })

    .directive('daySummary', function() {
        return {
            controller: 'DaySummaryCtrl',
            templateUrl: '/app/components/daySummary/day-summary.html'
        }
    });;
}(angular));
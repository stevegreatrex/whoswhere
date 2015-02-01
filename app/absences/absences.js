/*global angular:false*/

(function(angular) {
angular.module('whoswhere.absences', ['ngRoute', 'whoswhere.absenceApi', 'whoswhere.daySummary'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/absences', {
            templateUrl: 'app/absences/absences.html',
            controller: 'AbsencesCtrl'
        });
    }])

    .controller('AbsencesCtrl', ['$scope', 'moment', 'absenceApi', function ($scope, moment, absenceApi) {
        $scope.dateRangeTypes = ['Week', 'Month'];
        $scope.dateRangeType = $scope.dateRangeTypes[0];
        $scope.dateRangeStart = moment().startOf('isoWeek');
        $scope.displayTitle = function() {
            if ($scope.dateRangeType === 'Week') {
                return 'Week beginning ' + $scope.dateRangeStart.format('D MMMM');
            } else {
                return $scope.dateRangeStart.format('MMMM YYYY');
            }
        };

        $scope.update = function() {
            $scope.loading = true;
            absenceApi.getAbsences($scope.dateRangeStart, $scope.dateRangeStart.clone().add(1, $scope.dateRangeType))
                .then(function(dateSummaries) {
                    if ($scope.dateRangeType === 'Week') {
                        $scope.chartByDate = getWeekData($scope.dateRangeStart, dateSummaries)
                    } else {
                        $scope.chartByDate = getMonthData($scope.dateRangeStart, dateSummaries);
                    }

                    $scope.loading = false;
                });
        };

        $scope.selectDate = function(points) {
            if (points.length && $scope.chartByDate) {
                $scope.selectedDate = $scope.chartByDate.labelMap[points[0].label];
            }
        };

        $scope.changeDate = function(offset) {
            $scope.dateRangeStart.add(offset, $scope.dateRangeType);
            $scope.selectedDate = $scope.dateRangeStart;
            $scope.update();
        };

        $scope.changeDateRangeType = function() {
            $scope.dateRangeStart = $scope.dateRangeStart.startOf($scope.dateRangeType === 'Month' ? 'month' : 'isoWeek');
            $scope.update();
        };

        $scope.update();
    }]);

    function getWeekData(start, dateSummaries) {
        var dates = {};

        start = start.clone().startOf('isoWeek');
        for (var offset=0; offset < 5; offset++) {
            var date = start.clone().add(offset, 'days');
            dates[date.format('YYYY-MM-DD')] = {
                date: date,
                value: 0
            };
        }
        dateSummaries.forEach(function(summary) {
            if (dates[summary.date]) {
                dates[summary.date].value = summary.getDays();
            }
        });

        var labelMap = {};

        return {
            labels: Object.keys(dates).map(function(d) {
                var label = dates[d].date.format('ddd D');
                labelMap[label] = dates[d].date;
                return label;
            }),
            data: [Object.keys(dates).map(function(d) { return dates[d].value; })],
            series: ['Absences'],
            labelMap: labelMap
        }
    }

    function getMonthData(start, dateSummaries) {
        var dates = {};

        start = start.clone().startOf('month');
        for (var date = start.clone(); date.isBefore(start.endOf('month')); date.add(1, 'days')) {
            if (date.weekday() === 0 || date.weekday() === 6) continue;
            dates[date.format('YYYY-MM-DD')] = {
                date: date.clone(),
                value: 0
            };
        }
        dateSummaries.forEach(function(summary) {
            if (dates[summary.date]) {
                dates[summary.date].value = summary.getDays();
            }
        });

        var labelMap = {};

        return {
            labels: Object.keys(dates).map(function(d) {
                var label = dates[d].date.format('ddd D');
                labelMap[label] = dates[d].date;
                return label;
            }),
            data: [Object.keys(dates).map(function(d) { return dates[d].value; })],
            series: ['Absences'],
            labelMap: labelMap
        }
    }
}(angular));
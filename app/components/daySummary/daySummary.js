/*global angular:false*/

(function(angular) {
angular.module('whoswhere.daySummary', ['whoswhere.absenceApi', 'chart.js'])

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

                    var byDepartment = {};
                    daySummary.absences.forEach(function(absence) {
                       if (!byDepartment[absence.user.workStream]) {
                           byDepartment[absence.user.workStream] = {
                               total: 0,
                               color: createChartColor(absence.user.workStreamColor)
                           };
                       }

                        byDepartment[absence.user.workStream].total += absence.getDays();
                    });

                    $scope.chartByDepartment = {
                        labels: Object.keys(byDepartment),
                        data: Object.keys(byDepartment).map(function (stream) {
                            return byDepartment[stream].total;
                        }),
                        colors:Object.keys(byDepartment).map(function (stream) {
                            return byDepartment[stream].color;
                        })
                    };

                    //replace a blank chart with an empty one
                    if (!$scope.chartByDepartment.labels.length) {
                        $scope.chartByDepartment = blankChart;
                    }
                });
        };

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

        $scope.$watch('date', $scope.update, true);
    }])

    .directive('daySummaryList', function() {
        return {
            controller: 'DaySummaryCtrl',
            templateUrl: '/app/components/daySummary/day-summary-list.html',
            scope: {
                date: '=date',
                showDatePicker: '=showDatePicker'
            }
        }
    })

    .directive('daySummary', function() {
        return {
            controller: 'DaySummaryCtrl',
            templateUrl: '/app/components/daySummary/day-summary.html',
            scope: {
                date: '=date',
                showDatePicker: '=showDatePicker'
            }
        }
    });

    function createChartColor(color) {
        return {
            fillColor: color,
            pointColor: color,
            strokeColor: color
        };
    }

    var blankChart = {
        labels: ['None'],
        data: [1],
        colors: [createChartColor('#888')]
    };
}(angular));
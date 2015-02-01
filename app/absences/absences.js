/*global angular:false*/

(function(angular) {
angular.module('whoswhere.absences', ['ngRoute', 'whoswhere.absenceApi'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/absences', {
            templateUrl: 'app/absences/absences.html',
            controller: 'AbsencesCtrl'
        });
    }])

    .controller('AbsencesCtrl', ['$scope', 'moment', 'absenceApi', function ($scope, moment, absenceApi) {
        $scope.dateRangeTypes = ['Week', 'Month', 'Year'];
        $scope.dateRangeType = $scope.dateRangeTypes[0];
        $scope.dateRangeStart = moment().startOf($scope.dateRangeType);

        $scope.update = function() {
            $scope.loading = true;
            absenceApi.getAbsences($scope.dateRangeStart, $scope.dateRangeStart.clone().add(1, $scope.dateRangeType))
                .then(function(dateSummaries) {

                    $scope.chartByDate = {
                        labels: dateSummaries.map(function (s) { return moment(s.date).format('ddd D MMM'); }),
                        series: ['Absences'],
                        data: [
                            dateSummaries.map(function(s) { return s.getDays(); })
                        ]
                    };

                    $scope.loading = false;
                });
        };

        $scope.update();
    }]);
}(angular));
/*global angular:false*/

(function(angular) {
angular.module('whoswhere.createAbsence', ['ngRoute', 'whoswhere.absenceApi', 'whoswhere.daySummary'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/absences/create', {
        templateUrl: '/app/createAbsence/create-absence.html',
        controller: 'CreateAbsenceCtrl'
    });
  }])

  .controller('CreateAbsenceCtrl', ['$scope', 'moment', 'absenceApi', function ($scope, moment, absenceApi) {
    $scope.minDate = moment().toDate();
    $scope.start = nextWeekDay(moment().add(1, 'days')).toDate();
    $scope.end = moment($scope.start).toDate();

    $scope.disableWeekends = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.changeStart = function() {
      $scope.end = moment($scope.start).toDate();
      $scope.calculateDays();
    };

    $scope.calculateDays = function() {
      $scope.days = countWeekDays(moment($scope.start), moment($scope.end));
    };

    $scope.calculateDays();

    function nextWeekDay(date) {
      while (date.isoWeekday() >= 6) {
        date.add(1, 'days');
      }

      return date;
    }

    function countWeekDays(start, end) {
      start = start.clone();
      var days = 1;
      while (start.isBefore(end)) {
        if (start.isoWeekday() < 6) {
          days++;
        }
        start.add(1, 'days');
      }

      return days;
    }
  }]);
}(angular));
(function(angular) {
angular.module('whoswhere', [
	'ngRoute',

	'whoswhere.navigation',
	'whoswhere.home',
	'whoswhere.absences',
	'whoswhere.createAbsence',

	'whoswhere.absenceApi',
	'whoswhere.daySummary',
	'whoswhere.Model',
	'whoswhere.hideWeekends',
	'whoswhere.spinner',

	'ui.bootstrap',
	'chart.js'
])

  .config(['$routeProvider', '$locationProvider', 'datepickerConfig', function($routeProvider, $locationProvider, datepickerConfig) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.otherwise({redirectTo: '/home'});

    datepickerConfig.formatYear = 'yyyy';
    datepickerConfig.formatDay = 'd';
    datepickerConfig.startingDay = 1;
    datepickerConfig.showButtonBar = false;
    datepickerConfig.showWeeks = false;

  }]);
}(angular));
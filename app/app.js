(function(angular) {
    angular.module('whoswhere', [
        'ngRoute',
        'whoswhere.navigation',
        'whoswhere.home',
        'whoswhere.absenceApi',
        'whoswhere.daySummary',
        'whoswhere.spinner',
        'whoswhere.Model',
        'ui.bootstrap',
        'chart.js'
    ])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
}(angular));
(function(angular) {
    angular.module('whoswhere', [
        'ngRoute',
        'whoswhere.navigation',
        'whoswhere.home',
        'ui.bootstrap'
    ])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
}(angular));
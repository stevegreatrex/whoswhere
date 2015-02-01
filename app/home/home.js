/*global angular:false*/

(function(angular) {
    angular.module('whoswhere.home', [
        'ngRoute'
    ])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', ['$scope', function ($scope) {
    }]);
}(angular));
(function(angular) {

    function createLink(name, url, icon, $location) {
        return {
            name: name,
            url: url,
            icon: icon,
            active: $location.path() === url
        };
    }

    angular.module('whoswhere.navigation', [])

    .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.links = [
            createLink('Home', '/', 'home', $location),
            createLink('Absence', '/absence', 'calendar', $location)
        ];
    }]);
}(angular));
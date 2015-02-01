(function(angular) {

    function createLink(name, url, icon) {
        return {
            name: name,
            url: url,
            icon: icon
        };
    }

angular.module('whoswhere.navigation', [])

    .controller('NavCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.links = [
            createLink('Home', '/home', 'home'),
            createLink('Absences', '/absences', 'calendar')
        ];

        $scope.isActive = function(url) {
            return $location.path().indexOf(url) === 0;
        }
    }]);
}(angular));
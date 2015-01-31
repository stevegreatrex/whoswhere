/*global angular:false*/

(function(angular) {
angular.module('whoswhere.absenceApi', ['angularMoment', 'whoswhere.Model'])

    .factory('absenceApi', ['$http', 'moment', 'Model', function ($http, moment, Model) {
        function AbsenceApi() {
        }

        AbsenceApi.prototype.getAbsencesOnDate = function(date) {
            date = moment(date);
            return $http.get('/api/absence/' + date.format('YYYY/MM/DD'))
                .then(function(data) {
                    return Model.DateSummary.fromJs(data.data);
                });
        };

        return new AbsenceApi();
    }]);
}(angular));
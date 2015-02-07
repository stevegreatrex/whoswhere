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

		AbsenceApi.prototype.getAbsences = function(start, end) {
			start = moment(start);
			end = moment(end);

			return $http.get('/api/absence?start=' + start.format('YYYY/MM/DD') + '&end=' + end.format('YYYY/MM/DD'))
				.then(function(data) {
						return data.data.map(Model.DateSummary.fromJs);
				});
		};

		AbsenceApi.prototype.getAbsenceTypes = function() {
			return $http.get('/api/absence/types')
				.then(function(data) {
					return data.data;
				});
		};

		AbsenceApi.prototype.requestAbsence = function(absence) {
			console.log('SERVER REQUEST: ');
			console.log(absence);

			return $http.post('/api/absence', absence);
		};

		return new AbsenceApi();
	}]);
}(angular));
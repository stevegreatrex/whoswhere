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
						var dates = getDatesBetween(start, end);
						data.data.map(Model.DateSummary.fromJs).forEach(function(day) {
							dates[moment(day.date).format('YYYY-MM-DD')] = day;
						});

						return Object.keys(dates).map(function(date) { return dates[date]; });
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

			function getDatesBetween(start, end) {
				var dates = {};
				start = moment(start);
				end = moment(end);

				do {
					dates[start.format('YYYY-MM-DD')] = new Model.DateSummary(start.clone().toDate());
					start.add(1, 'days');
				} while(!start.isAfter(end, 'day'));

				return dates;
			}

			return new AbsenceApi();
		}]);
}(angular));
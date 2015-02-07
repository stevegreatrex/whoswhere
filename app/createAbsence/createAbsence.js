/*global angular:false*/

(function(angular) {
	angular.module('whoswhere.createAbsence', ['ngRoute', 'whoswhere.absenceApi', 'whoswhere.daySummary'])

		.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/absences/create', {
				templateUrl: '/app/createAbsence/create-absence.html',
				controller: 'CreateAbsenceCtrl'
			});
		}])

		.controller('CreateAbsenceCtrl', ['$scope', '$window', 'moment', 'absenceApi', function ($scope, $window, moment, absenceApi) {
			$scope.minDate = moment().toDate();
			$scope.start = nextWeekDay(moment().add(1, 'days')).toDate();
			$scope.end = moment($scope.start).toDate();

			$scope.daySegments = ['Full Day', 'AM', 'PM'];
			$scope.startSegment = $scope.daySegments[0];
			$scope.endSegment = $scope.daySegments[0];
			$scope.showStartSegment = false;

			$scope.absenceTypes = [];
			$scope.absenceType = null;

			absenceApi.getAbsenceTypes().then(function(types) {
				$scope.absenceTypes = types;
				$scope.absenceType = $scope.absenceTypes[0];
			});

			$scope.setAbsenceType = function(type) {
				$scope.absenceType = type;
			};

			$scope.submit = function() {
				$scope.submitting = true;
				absenceApi.requestAbsence(buildAbsenceRequest())
					.then(function() {
						$scope.submitted = true;
					});
			};

			$scope.reload = function() {
				$window.location.reload();
			};

			$scope.disableWeekends = function(date, mode) {
				return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			};

			$scope.changeStart = function() {
				$scope.end = moment($scope.start).toDate();
				$scope.calculateDays();
			};

			$scope.calculateDays = function() {
				$scope.days = countWeekDays(moment($scope.start), moment($scope.end));
				if (moment($scope.start).isSame(moment($scope.end), 'day')) {
					$scope.showStartSegment = false;
					$scope.startSegment = $scope.daySegments[0];
				} else {
					$scope.showStartSegment = true;
				}

				if ($scope.startSegment !== $scope.daySegments[0]) {
					$scope.days -= 0.5;
				}

				if ($scope.endSegment !== $scope.daySegments[0]) {
					$scope.days -= 0.5;
				}
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

			function buildAbsenceRequest() {
				var request = {
					absenceType: $scope.absenceType,
					dates: []
				};

				var start = moment($scope.start);
				var end = moment($scope.end);

				do {
					request.dates.push({
						date: start.format('YYYY-MM-DD'),
						unit: 'all'
					});
					start.add(1,'days');
				} while (start.isBefore(end, 'day'));

				if ($scope.startSegment === $scope.daySegments[1]) {
					request.dates[0].unit = 'am';
				}
				if ($scope.startSegment === $scope.daySegments[2]) {
					request.dates[0].unit = 'pm';
				}
				if ($scope.endSegment === $scope.daySegments[1]) {
					request.dates[request.dates.length-1].unit = 'am';
				}
				if ($scope.endSegment === $scope.daySegments[2]) {
					request.dates[request.dates.length-1].unit = 'pm';
				}

				return request;
			}
		}]);
}(angular));
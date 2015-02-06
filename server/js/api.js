/*global require:false, module:false*/

(function(module, require) {

	var pg = require('pg');
	var config = require('./config');
	var Promise = require('es6-promise').Promise;
	var DateSummary = require('../../shared-js/model').DateSummary;
	var Absence = require('../../shared-js/model').Absence;

	function connect() {
		return new Promise(function (resolve, reject) {
			pg.connect(config.db, function (err, client, done) {
				if (err) {
					done();
					reject(err);
					return;
				}

				var promise = resolve(client);
				if (promise && promise.then) {
					promise.then(done, function (err) {
						done();
						reject(err);
					});
				} else {
					done();
				}
			});
		});
	}

	function getAbsencesOnDate(date) {
		return connect().then(function (client) {
			return new Promise(function (resolve, reject) {
				client.query(
					'SELECT users.id as userId, sum(unit) as unit, first(firstName) as firstName, first(lastName) as lastName, ' +
					'first(work_streams.name) as workStream, first(work_streams.color) as workStreamColor, absence_types.name as type, ' +
					'first(to_char(absenceDate, \'yyyy-mm-dd\')) as absenceDate, first(users.imageUrl) as imageUrl FROM absences ' +
					'JOIN users on absences.userId=users.id ' +
					'JOIN work_streams on users.workStreamId=work_streams.id ' +
					'JOIN absence_types on absences.absenceTypeId=absence_types.id ' +
					'WHERE absenceDate = $1 ' +
					'GROUP BY users.id, absence_types.name;', [date], function (err, result) {
						if (err) {
							reject(err);
							return;
						}

						resolve(new DateSummary(date, result.rows.map(Absence.fromRow)));
					});
			});
		});
	}

	function getAbsences(start, end) {
		if (!start || !end) {
			return Promise.reject("Query parameters not specified");
		}
		return connect().then(function (client) {
			return new Promise(function (resolve, reject) {
				client.query(
					'SELECT users.id as userId, sum(unit) as unit, first(firstName) as firstName, first(lastName) as lastName, '+
					'first(work_streams.name) as workStream, first(work_streams.color) as workStreamColor, absence_types.name as type, '+
					'first(to_char(absenceDate, \'yyyy-mm-dd\')) as absenceDate, first(users.imageUrl) as imageUrl FROM absences ' +
					'JOIN users on absences.userId=users.id ' +
					'JOIN work_streams on users.workStreamId=work_streams.id ' +
					'JOIN absence_types on absences.absenceTypeId=absence_types.id ' +
					'WHERE absenceDate >= $1 AND absenceDate <= $2 ' +
					'GROUP BY users.id, absence_types.name, absences.absenceDate ' +
					'ORDER BY absences.absenceDate;', [start, end], function (err, result) {
						if (err) {
							reject(err);
							return;
						}

						resolve(DateSummary.fromRows(result.rows));
					});
			});
		});
	}

	function getAbsenceTypes() {
		return connect().then(function(client) {
			return new Promise(function(resolve, reject) {
				client.query(
					'SELECT id as id, name as name ' +
					'FROM absence_types ' +
					'WHERE id > 1 ' +
					'ORDER BY name', function(err, result) {
						if (err) {
							reject(err);
							return;
						}

						resolve(result.rows);
					}
				)
			});
		});
	}

	module.exports = {
		getAbsences: getAbsences,
		getAbsencesOnDate: getAbsencesOnDate,
		getAbsenceTypes: getAbsenceTypes
	};
}(module, require));

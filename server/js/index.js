/*global require: false, __dirname: false*/

(function(require) {
	var express = require('express');
	var bodyParser= require('body-parser');
	var api = require('./api');
	var config = require('./config');
	var path = require('path');

	var app = express();

	app.use(bodyParser.json());

	app.use('/lib', express.static(path.join(__dirname, '../../bower_components')));
	app.use('/app', express.static(path.join(__dirname, '../../app')));
	app.use('/shared', express.static(path.join(__dirname, '../../shared-js')));
	app.use(express.static(path.join(__dirname, '../../app')));

	// configure the API calls

	app.get('/api/absence/:year/:month/:day', function (req, res) {
		api.getAbsencesOnDate('' + req.params.year + '-' + req.params.month + '-' + req.params.day)
			.then(function (absences) {
				res.status(200).json(absences);
			}, handleError(res));
	});

	app.get('/api/absence', function (req, res) {
		if (!req.query.start || !req.query.end) {
			console.warn('Invalid request:', req.originalUrl);
			res.status(400).send('start and end query parameters are required');
			return;
		}

		api.getAbsences(req.query.start, req.query.end)
			.then(function (absences) {
				res.status(200).json(absences);
			}, handleError(res));
	});

	app.get('/api/absence/types', function (req, res) {
		api.getAbsenceTypes()
			.then(function (absenceTypes) {
				res.status(200).json(absenceTypes);
			}, handleError(res));
	});

	app.post('/api/absence', function(req,res) {
		console.log('Absence request:');
		console.log(req.body);

		//fake some processing!
		setTimeout(function() {
			res.status(200).json({ ok: true });
		}, 2000);
	});

	//for anything else, return our angular page

	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, '../../app/index.html'));
	});

	function handleError(res) {
		return function (err) {
			console.error(err);
			res.status(500).send(err);
		}
	}

	app.listen(config.port, config.ip, function () {
		console.log('Server started');
	});

}(require));

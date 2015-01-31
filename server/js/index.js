/*global require: false, __dirname: false*/

(function(require) {
    var express = require('express');
    var api = require('./api');
    var path = require('path');

    var app = express();;
    app.use('/lib', express.static(path.join(__dirname, '../../bower_components')));
    app.use('/app', express.static(path.join(__dirname, '../../app')))
    app.use(express.static(path.join(__dirname, '../../app')))

    app.get('/', function (req, res) {
        res.render('index.html');
    });

    function handleError(res) {
        return function (err) {
            console.error(err);
            res.status(500).send(err);
        }
    }

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

    var server = app.listen(3000);

    console.log('Server started on http://%s:%s', server.address().address, server.address().port);
}(require));

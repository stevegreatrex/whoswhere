/*global require: false, __dirname: false*/

var express = require('express');
var pg = require('pg');

var config = require('./config');

var app = express();
app.use(express.static(__dirname + '/server/views'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/content', express.static(__dirname + '/server/content'));
app.use('/lib', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
  res.render('/server/views/index.html');
});

app.get('/api/absence', function(req, res) {
   pg.connect(config.db, function(err, client, done) {
       if (err) {
           console.error(err);
           done();
           return;
       }

       client.query('SELECT CURRENT_DATE as Date', function(err, result) {
           done();
           res.status(200).json(result.rows[0].date);
       });
   });
});

var server = app.listen(3000);

console.log('Server started on http://%s:%s', server.address().address, server.address().port);

/*global require: false, __dirname: false*/

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/server/views'));
app.use('/content', express.static(__dirname + '/server/content'));
app.use('/lib', express.static(__dirname + '/bower_components'));

app.get('/', function(req, res) {
  res.render('/server/views/index.html');
});

var server = app.listen(3000);
console.log('Server started on http://%s:%s', server.address().address, server.address().port);

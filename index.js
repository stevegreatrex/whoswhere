var express = require('express');
var app = express();
app.use(express.static(__dirname + '/server/views'));

app.get('/', function(req, res) {
  res.render('/server/views/index.html');
});

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server started on http://%s:%s', host, port);
});

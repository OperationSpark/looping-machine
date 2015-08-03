var express = require('express');
var app = express();

app.use('/', express.static('.'));

var server = app.listen(8283, function () {

  var port = server.address().port;
  console.log("Open your browser to http://localhost:%s", port);
});

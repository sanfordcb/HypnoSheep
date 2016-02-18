var express = require('express');
var app = express();
var morgan = require('morgan');

var port = process.env.PORT || 8080;

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello World');
});

app.listen(port, function(){
  console.log('Listening on port', port);
});


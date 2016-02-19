var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

var db = require('./dbConfig.js');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', routes);

app.use(express.static('public'));

app.listen(port, function(){
  console.log('Listening on port', port);
});

var path = require('path');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var userRoutes = require('./users/userRoutes.js');

var db = require('./dbConfig.js');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/api', routes);
app.use('/auth', userRoutes);

app.use(express.static('public'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, function(){
  console.log('Listening on port', port);
});

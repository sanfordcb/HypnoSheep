// Node-Core deps
var path = require('path');
// 3rd-Party deps
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// Project deps
var userRoutes = require('./users/userRoutes.js');
var jwtAuth = require('./utils/jwtAuth.js');
var db = require('./utils/dbConfig.js');
// Local deps
var routes = require('./routes.js');

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/api', jwtAuth, routes);
app.use('/auth', userRoutes);

app.use(express.static('public'));

// This redirects any GET requests that aren't for '/' or our above-mentioned
// routes to the home-page, letting the router on our SPA front-end handle it.
// This way, trying to refresh a specific page of the app won't
// end in a "cannot GET '/part/of/app'" error
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, function(){
  console.log('Listening on port', port);
});

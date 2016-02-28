// Node-Core deps
var path = require('path');

// 3rd-Party deps
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
  // Webpack dev deps
  var webpack = require('webpack');
  var webpackMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('../webpack.config.js');

// Project deps
var userRoutes = require('./users/userRoutes.js');
var jwtAuth = require('./utils/jwtAuth.js');
var db = require('./utils/dbConfig.js');

// Local deps
var routes = require('./routes.js');

var isDeveloping = process.env.NODE_ENV !== 'production';
var port = isDeveloping ? 8080 : process.env.PORT;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use('/api', jwtAuth, routes);
app.use('/api', routes);
app.use('/auth', userRoutes);

if (isDeveloping) {
  var compiler = webpack(config);
  var middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(path.join(__dirname, '../dist')));

  // This redirects any GET requests that aren't for '/' or our above-mentioned
  // routes to the home-page, letting the router on our SPA front-end handle it.
  // This way, trying to refresh a specific page of the app won't
  // end in a "cannot GET '/part/of/app'" error
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, function () {
  console.log('Listening on port', port);
});

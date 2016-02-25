var express = require('express');

var resourceRoutes = require('./resources/resourceRoutes.js');
var projectRoutes = require('./projects/projectRoutes.js');

var app = express.Router();

app.use('/resources', resourceRoutes);
app.use('/projects', projectRoutes);

module.exports = app;

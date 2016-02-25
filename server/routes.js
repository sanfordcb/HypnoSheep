var express = require('express');

var resourceRoutes = require('./resources/resourceRoutes.js');
var projectRoutes = require('./projects/projectRoutes.js');

var app = express.Router();

app.use('/resources', linkRoutes);
app.use('/projects', projectRoutes);

module.exports = app;

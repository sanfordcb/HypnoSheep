var express = require('express');

var linkRoutes = require('./links/linkRoutes.js');
var projectRoutes = require('./projects/projectRoutes.js');

var app = express.Router();

app.use('/links', linkRoutes);
app.use('/projects', projectRoutes);

module.exports = app;

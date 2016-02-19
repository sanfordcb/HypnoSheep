var express = require('express');

var linkRoutes = require('./links/linkRoutes.js');
var projectRoutes = require('./projects/projectRoutes.js');
var userRoutes = require('./users/userRoutes.js');

var app = express.Router();

app.use('/links', linkRoutes);
app.use('/projects', projectRoutes);
app.use('/users', userRoutes);

module.exports = app;

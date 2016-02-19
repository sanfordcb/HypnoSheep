var projectController = require('./projectController.js');
var express = require('express');

var app = express.Router();

app.get('/', projectController.getProjects);
app.post('/', projectController.addProject);

module.exports = app;

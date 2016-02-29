var resourceController = require('./resourceController.js');
var express = require('express');

var app = express.Router();

app.get('/', resourceController.getResources);
// app.get('/:projectId', resourceController.getResourcesByProjectId);
app.get('/:projectName', resourceController.getResourcesByProjectName);
app.post('/', resourceController.addResource);
app.put('/:resourceId', resourceController.updateResource);
app.delete('/:resourceId', resourceController.deleteResource);

module.exports = app;

var linkController = require('./linkController.js');
var express = require('express');

var app = express.Router();

app.get('/', linkController.getLinks);
app.post('/', linkController.addLink);

module.exports = app;

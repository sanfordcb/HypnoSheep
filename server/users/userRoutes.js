var userController = require('./userController.js');
var express = require('express');

var app = express.Router();

app.post('/signin', userController.signin);
app.post('/signup', userController.signup);

module.exports = app;

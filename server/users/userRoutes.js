var userController = require('./userController.js');
var express = require('express');

var app = express.Router();

app.get('/users', userController.getUsers);
app.post('/signin', userController.signin);
app.post('/signup', userController.signup);

module.exports = app;

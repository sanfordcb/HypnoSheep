// import React from 'react';
// import paths from './index'
var React = require('react');
var path = require('./index');

var LoginAction = React.createClass({
  loginUser: function(jwt){
    //RouterContainer.get().transitionTo('/projects');
    paths.get().transitionTo('/projects');
    localStorage.setItem('jwt', jwt);
  }
});

module.exports = LoginAction;
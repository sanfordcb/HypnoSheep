//import React from 'react';
// import request from 'superagent';
// import Auth from './AuthService';
import { browserHistory } from 'react-router'
var React = require('react');
var request = require('superagent');
//var LoginAction = require('./LoginActions');
//var Auth = require('./AuthService');
//var path = require('./index');

var SignIn = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },

  componentDidMount: function() {
    //check local storage for jwt
    //window.sessionStorage.token
  },

  auth: function(username, password) {
    var user = {
      username: username,
      password: password
    };
    request.post('auth/signin').send(user).end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else if ( res.text === 'user not found' || res.text === 'passwords dont match'){
        console.log(res.text);
      } else {
        var jwt = JSON.parse(res.text);
        this.loginUser(jwt.token);
        return true;
      }
    });
  },

  loginUser: function(jwt) {
    browserHistory.push('/projects');
    localStorage.setItem('jwt', jwt);
    console.log(window);
  },

  handleUserSubmit: function(e) {
    e.preventDefault();

    this.auth(this.state.username, this.state.password)
      .catch(err => {
        console.log('error! ', err);
      });
    this.setState({username: '', password: ''});
  },

  onUserChange: function(e) {
    this.setState({username: e.target.value});
  },

  onPassChange: function(e) {
    this.setState({password: e.target.value});
  },

  render: function() {
    return (
      <div>
        <h1>Sign in</h1>
        <form className="userForm">
          {/*<Link to="/projects"></Link>*/}
          <input 
            type="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.onUserChange}
          />
          <br />
          <input 
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onPassChange}
          />
          <br />
          <input
            type="submit"
            value="Sign In"
            onClick={this.handleUserSubmit}
          />
        </form>
      </div>
    )
  }
});

module.exports = SignIn;
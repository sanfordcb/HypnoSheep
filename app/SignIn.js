// import React from 'react';
// import request from 'superagent';
// import Auth from './AuthService';
var React = require('react');
var request = require('superagent');
var Auth = require('./AuthService');

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

  handleUserSubmit: function(e) {
    e.preventDefault();

    // Auth.login(this.state.username, this.state.password)
    //   .catch(err => {
    //     console.log('error! ', err);
    //   });
    var user = {
      username: this.state.username,
      password: this.state.password
    };

    request.post('auth/signin').send(user).end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else if ( res.text === 'user not found' || res.text === 'passwords dont match'){
        console.log(res.text);
      } else {
        console.log('yay')
      }
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
        <h3>Sign in</h3>
        <form className="userForm">

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
            Link to="/projects"
          />
        </form>
      </div>
    )
  }
});

module.exports = SignIn;
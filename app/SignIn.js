import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router'

const SignIn = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },

  componentDidMount: function() {
    //checks local storage (under window) for jwt token. if token exists, sends
    //request to server to check if token is valid. if so, routes user to
    //projects page
    if(localStorage.jwt){
      request.post('auth/signin').send(localStorage.jwt).end((err, res) => {
        if(err || !res.ok){
          console.log(err);
        } else if(res.text === 'not authorized' || res.text === 'Token Expired'){
          console.log(res.text);
        } else {
          browserHistory.push('/projects');
        }
      });
    }
  },

  auth: function(username, password) {
    //if no token is found, user must manually log in. this sends a request
    //to our server which will check the database for the username and password.
    //this request is only initiated after user submits their info
    let user = {
      username: username,
      password: password
    };
    request.post('auth/signin').send(user).end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else if (res.text === 'user not found' || res.text === 'passwords dont match'){
        console.log(res.text);
      } else {
        let userId = res.body.user._id;
        let jwt = JSON.parse(res.text);
        this.loginUser(userId, jwt.token);
        return true;
      }
    });
  },

  loginUser: function(userId, jwt) {
    localStorage.setItem('jwt', jwt);
    browserHistory.push('/projects/' + userId);
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

export default SignIn;
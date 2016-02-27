import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

const SignIn = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    }
  },

  componentDidMount() {
    //checks local storage (under window) for jwt token. if token exists, sends
    //request to server to check if token is valid. if so, routes user to
    //projects page
    if(localStorage.jwt){
      request
        .post('auth/signin')
        .send(localStorage.jwt)
        .end((err, res) => {
          if(err || !res.ok){
            console.log(err);
          } else if(res.text === 'not authorized' || res.text === 'Token Expired'){
            console.log(res.text);
          } else {
            browserHistory.push('/projects/' + localStorage.userId);
          }
      });
    }
  },

  auth(username, password) {
    //if no token is found, user must manually log in. this sends a request
    //to our server which will check the database for the username and password.
    //this request is only initiated after user submits their info
    let user = {
      username: username,
      password: password
    };
    request
      .post('auth/signin')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else if (res.text === 'user not found' || res.text === 'passwords dont match'){
          console.log(res);
        } else {
          let userId = res.body.user._id;
          let jwt = JSON.parse(res.text);
          this.loginUser(userId, jwt.token);
          return true;
        }
      });
  },

  loginUser(userId, jwt) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', userId);
    browserHistory.push('/projects/' + userId);
  },

  linkToSignUp() {
    browserHistory.push('/signup/');
  },

  handleUserSubmit(e) {
    e.preventDefault();

    this.auth(this.state.username, this.state.password)
      .catch(err => {
          console.log('error! ', err);
        });
    this.setState({username: '', password: ''});
  },

  onUserChange(e) {
    this.setState({username: e.target.value});
  },

  onPassChange(e) {
    this.setState({password: e.target.value});
  },

  render() {
    const style = {
      margin: 12,
    };
    return (
      <div>
        <h1>Sign in</h1>
        <form className="userForm">
          {/*<Link to="/projects"></Link>*/}
          <TextField 
            type="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.onUserChange}
          />
          <br />
          <TextField 
            type="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onPassChange}
          />
          <br />
          <RaisedButton
            label="Sign In"
            secondary={true}
            style={style}
            type="submit"
            onClick={this.handleUserSubmit}
          />
        <RaisedButton
            label="Sign Up"
            secondary={true}
            style={style}
            type="submit"
            onClick={this.linkToSignUp}
        />
        </form>
      </div>
    )
  }
});

export default SignIn;
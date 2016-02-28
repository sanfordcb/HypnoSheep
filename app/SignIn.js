import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

const SignIn = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },

  onUserChange(e) {
    this.setState({ username: e.target.value });
  },

  onPassChange(e) {
    this.setState({ password: e.target.value });
  },

  auth(username, password) {
    const user = {
      username,
      password
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
          const userId = res.body.user._id;
          const jwt = JSON.parse(res.text);
          this.loginUser(userId, jwt.token);
          return true;
        }
      });
  },

  loginUser(userId, jwt) {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', userId);
    browserHistory.push(`/projects/${userId}`);
  },

  linkToSignUp() {
    browserHistory.push('/signup/');
  },

  handleUserSubmit(e) {
    e.preventDefault();
    this.auth(this.state.username, this.state.password);
    this.setState({ username: '', password: '' });
  },

  render() {
    const buttonStyle = {
      margin: 12,
    };
    const backgroundStyle = {
      "text-align": "center",
    };
    const paperStyle = {
      height: '100%',
      width: '15%',
      margin: 20,
      padding: 20,
      textAlign: 'center',
      display: 'inline-block',
      float: 'center'
    };
    return (
      <div style={backgroundStyle}>
        <h3>Sign In</h3>
        <form className="userForm">
          <TextField
            hintText="Username"
            type="username"
            value={this.state.username}
            onChange={this.onUserChange}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={this.onPassChange}
          />
          <br />
          <RaisedButton
            label="Sign In"
            secondary={true}
            style={buttonStyle}
            type="submit"
            onClick={this.handleUserSubmit}
          />
        <RaisedButton
          label="Sign Up"
          secondary={true}
          style={buttonStyle}
          type="submit"
          onClick={this.linkToSignUp}
        />
        </form>
        <Paper style={paperStyle} zDepth={2}>
          <h2 style={{ fontSize: 40 }}>Where</h2>
          <h2 style={{ fontSize: 40 }}>Was</h2>
          <h2 style={{ fontSize: 40 }}>I</h2>
          <h2 style={{ fontSize: 40 }}>?</h2>
        </Paper>
        </div>
    );
  }
});

export default SignIn;

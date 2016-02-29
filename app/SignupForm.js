import React from 'react';
import request from 'superagent';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import Paper from 'material-ui/lib/paper';

const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
      usernameError: null,
      passwordError: null
    };
  },

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
    this.validateUsername(event);
  },

  validateUsername(event) {
    const username = event.target.value;
    // TODO: Replace with some regex - considering length, unallowed characters, etc
    const error = username.length < 4 ? 'Username must be at least four characters' : null;
    this.setState({ usernameError: error });
  },

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
    // this.validatePassword(event);
  },

  /*
  TODO: Use regex to validate password instead of just length
  TODO: Add a second password text field & passwords must match
  validatePassword(event) {
    const password = event.target.value;
    let error = password.length < 6 ? 'Password must be at least six characters' : null;
    this.setState({ passwordError: error });
  },
  */

  onSignupSubmit() {
    // format data
    const user = {
      username: this.state.username,
      password: this.state.password,
    };

    // send post request with data
    request
      .post('auth/signup')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
          return;
        }
        if (res.text === 'Username already exists.') {
          this.setState({ usernameError: res.text });
          return;
        }
        browserHistory.push('/signin');
      });

    // clear forms
    this.setState({ username: '', password: '' });
  },

  linkToSignIn() {
    browserHistory.push('/signin/');
  },

  render() {
    const buttonStyle = {
      margin: 12
    };
    const backgroundStyle = {
      textAlign: 'center'
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
        <h3>Sign Up</h3>
        <form
          className="signupForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <TextField
            hintText="Username"
            value={this.state.username}
            errorText={this.state.usernameError}
            onChange={this.onUsernameChange}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            errorText={this.state.passwordError}
            onChange={this.onPasswordChange}
          /><br />
          <RaisedButton
            label="Sign In"
            secondary={true}
            style={buttonStyle}
            type="submit"
            onClick={this.linkToSignIn}
          />
          <RaisedButton
            type="submit"
            label="Sign Up"
            secondary={true}
            onClick={this.onSignupSubmit}
            style={buttonStyle}
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

export default SignupForm;

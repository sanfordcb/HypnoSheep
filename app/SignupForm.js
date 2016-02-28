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
    };
  },

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
        } else if (res.text === 'user already exists') {
          console.log(res.text);
        } else {
          console.log('Success!');
          browserHistory.push('/signin');
        }});

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
      "text-align": "center"
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
            onChange={(event) => this.setState({ username: event.target.value })}
          /><br />
          <TextField
            hintText="Password"
            type="password"
            value={this.state.password}
            onChange={(event) => this.setState({ password: event.target.value })}
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

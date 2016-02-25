import React from 'react';
import request from 'superagent';

const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: '',
      password: '',
    };
  },

  render() {
    return (
      <div>
        <h3>Sign Up</h3>
        <form 
          className="signupForm" 
          onSubmit={(event) => event.preventDefault()}>
          
          <label>Username: </label>
          <input
            value={this.state.username}
            onChange={(event) => this.setState({username: event.target.value})}
          />

          <label>Password: </label>
          <input 
            value={this.state.password}
            onChange={(event) => this.setState({password: event.target.value})}
          />

          <input 
            type="submit" 
            value="Sign Up"
            onClick={this.onSignupSubmit}
          />
        </form>
      </div>
    );
  },

  onSignupSubmit() {
    
    //format data
    var user = {
      username: this.state.username,
      password: this.state.password,
    };

    //send post request with data
    request
      .post('auth/signup')
      .send(user)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else if (res.text === 'user already exists') {
          console.log(res.text);
        } else {
          console.log('Success!')
        }});

    //clear forms
    this.setState({username: '', password: ''});
  }
});

export default SignupForm;

import React from 'react';
import { browserHistory } from 'react-router';

import Paper from 'material-ui/lib/paper';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import RaisedButton from 'material-ui/lib/raised-button';
import CardText from 'material-ui/lib/card/card-text';

const LandingPage = React.createClass({
  render() {
    return (
      <div style={{ padding: 80, height: '100%', minHeight: '100%' }}>
        <HomeImage />
        <GetStarted />
      </div>
    );
  }
});

const HomeImage = React.createClass({
  render() {
    const paperStyle = {
      height: '100%',
      width: '15%',
      margin: 20,
      padding: 20,
      textAlign: 'center',
      display: 'inline-block',
      float: 'left'
    };
    return (
      <div>
        <Paper style={paperStyle} zDepth={2}>
          <h2 style={{ fontSize: '3vw' }}>Where</h2>
          <h2 style={{ fontSize: '3vw' }}>Was</h2>
          <h2 style={{ fontSize: '3vw' }}>I</h2>
          <h2 style={{ fontSize: '3vw' }}>?</h2>
        </Paper>
        <img
          src="http://voleyko.ru/wp-content/uploads/2015/01/napisanie.jpg"
          style={{ float: 'left', width: '40%', height: 'auto' }}
        />
      </div>
    );
  }
});

const GetStarted = React.createClass({
  onSignUp() {
    browserHistory.push('/signup');
  },
  onSignIn() {
    browserHistory.push('/signin');
  },
  render() {
    return (
      <div>
      <Card>
        <CardHeader
          title="Turn your search results into a library of resources."
          subtitle="Start building your library today!"
          actAsExpander={true}
          showExpandableButton={true}
          style={{ lineHeight: '1.5vw' }}
        />
        <CardText expandable={true}>
          <ul>
            <li>Create a project</li>
            <li>Start searching</li>
            <li>Save the links to your Project Resources page</li>
            <li>Add comments, tag the links that helped, remove the ones that didn't</li>
          </ul>
        </CardText>
      </Card>
      <RaisedButton onClick={this.onSignUp} label="Sign Up" style={{ margin: 25 }} />
      <RaisedButton onClick={this.onSignIn} label="Sign In" style={{ margin: 25 }} />
      </div>
    );
  }
});

export default LandingPage;

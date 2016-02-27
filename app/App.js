import React from 'react';
import ReactRouter from 'react-router';
import Header from './Header';

const App = React.createClass({
  getUser() {
    return this.props.location.query.user;
  },
  render() {
    const path = this.props.location.pathname;
    if(path === '/' || path === '/signin' || path === '/signup') {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return(
        <div>
          <Header user={this.props.location.query.user} />
          {this.props.children}
        </div>
      );
    }
  }
});

export default App;

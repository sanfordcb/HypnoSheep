import React from 'react';
import ReactRouter from 'react-router';
import Header from './Header';

const App = React.createClass({
  render() {
    const path - this.props.location.pathname;
    if(path === '/' || path === '/signin' || path === '/signup') {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      return(
        <div>
          <Header />
          {this.props.children}
        </div>
      );
    }
  }
});

export default App;

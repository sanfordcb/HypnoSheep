import React from 'react';
import ReactRouter from 'react-router';
import Header from './Header';

const App = React.createClass({
  render() {
    if(this.props.location.pathname === '/' || this.props.location.pathname === '/signin' || this.props.location.pathname === 'signup') {
      Header = null;
    }
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

export default App;

import React from 'react';
import Header from './Header';
import { browserHistory } from 'react-router';

const App = React.createClass({
  componentDidMount() {
    if (!window.localStorage.jwt) {
      browserHistory.push('/signin');
    }
  },

  render() {
    return (
      <div>
        <Header params={this.props.params} />
        {this.props.children}
      </div>
    )
  }
});

export default App;

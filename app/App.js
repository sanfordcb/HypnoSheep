import React from 'react';
import Header from './Header';

const App = React.createClass({
  render() {
    console.log('params in app: ', this.props.params);
    return (
      <div>
        <Header params={this.props.params} />
        {this.props.children}
      </div>
    );
  }
});

export default App;

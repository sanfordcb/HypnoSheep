var React = require('react');
import Header from './Header';

var App = React.createClass({
  render: function() {
    return(
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

export default App;

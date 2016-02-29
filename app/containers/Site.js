import React from 'react';

const Site = React.createClass({
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
});

export default Site;

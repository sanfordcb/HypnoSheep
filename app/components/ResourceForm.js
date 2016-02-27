import React from 'react';

import TextField from 'material-ui/lib/text-field';

const ResourceForm = React.createClass({

  getInitialState() {
    return {url: ''};
  },

  handleResourceChange(e) {
    this.setState({url: e.target.value});
  },

  handleSubmit(e) {
    e.preventDefault();
    const resource = this.state.url.trim();
    if (!resource) {
      return;
    }
    this.props.onResourceSubmit({url: resource});
    this.setState({url: ''});
  },

  render() {
    return (
      <form className="resourceForm" onSubmit={this.handleSubmit}>
        <TextField
          type="resource"
          placeholder="Add a Resource"
          value={this.state.url}
          onChange={this.handleResourceChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

export default ResourceForm;

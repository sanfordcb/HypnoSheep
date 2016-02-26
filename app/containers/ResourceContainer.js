import React from 'react';
import request from 'superagent';
import Resource from '../components/Resource';

const ResourceContainer = React.createClass({
  getInitialState() {
    return {
      resource: Object.assign({}, this.props.resource)
    };
  },

  updateResource(data) {
    request
      .put(`/api/resources/${data._id}`)
      .send(data)
      .end((err, res) => {
        if (err || !res.ok) {
          return console.log('Error updating resource: ', err, res);
        }
        this.setState({
          resource: data
        });
      });
  },

  render() {
    const { deleteResource } = this.props;
    return (
      <Resource
        resource={this.state.resource}
        deleteResource={deleteResource}
        updateResource={this.updateResource}
      />
    );
  }
});

export default ResourceContainer;

import React from 'react';
import request from 'superagent';
import Resource from '../components/Resource';

const ResourceContainer = React.createClass({
  updateResource(data) {
    request
      .put()
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('Error updating resource: ', err, res);
        }
        console.log('Resource updated successfully: ', res);
      });
  },

  render() {
    const { resource, deleteResource } = this.props;
    console.log('Resource is: ', resource);
    return (
      <Resource
        resource={resource}
        deleteResource={deleteResource}
        updateResource={this.updateResource}
      />
    );
  }
});

export default ResourceContainer;

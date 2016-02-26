import React from 'react';
import request from 'superagent';
import Resource from '../components/Resource';

const ResourceContainer = React.createClass({
  updateResource(data) {
    console.log('data! ', data);
    // request
    //   .put(`/api/resources/${data._id}`)
    //   .end((err, res) => {
    //     if (err || !res.ok) {
    //       return console.log('Error updating resource: ', err, res);
    //     }
    //     return console.log('Resource updated successfully: ', res);
    //   });
  },

  render() {
    const { resource, deleteResource } = this.props;
    resource.description = 'awesome resource description';
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

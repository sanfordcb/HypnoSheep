import React from 'react';
import request from 'superagent';
import ResourceContainer from '../containers/ResourceContainer';

const ResourceList = React.createClass({
  deleteResource(id) {
    request
      .delete(`/api/resources/${id}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else {
          this.props.getResources();
        }
      });
  },

  render() {
    const { data } = this.props;

    return (
      <div className="resourceList">
        {data.map(resource =>
          <ResourceContainer
            key={resource._id}
            resource={resource}
            deleteResource={() =>
              this.deleteResource(resource._id)}
          />
        )}
      </div>
    );
  }
});

export default ResourceList;

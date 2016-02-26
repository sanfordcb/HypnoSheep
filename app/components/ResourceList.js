import React from 'React';
import request from 'superagent';
import ResourceContainer from '../containers/ResourceContainer';

const ResourceList = React.createClass({
  // render returns an array of Resource components by mapping the resource objects
  // stored in this.props.data
  deleteResource(id) {
    request
      .delete(`/api/resources/${id}`)
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

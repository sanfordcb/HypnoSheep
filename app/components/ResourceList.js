import React from 'React';
import request from 'superagent';
import ResourceContainer from '../containers/ResourceContainer';

const ResourceList = React.createClass({
  // render returns an array of Resource components by mapping the resource objects
  // stored in this.props.data
  render() {
    const { data, getResources } = this.props;

    const resourceNodes = data.map((resource) => {
      const deleteResource = () => {
        request
          .delete(`/api/resources/${resource._id}`)
          .end((err, res) => {
            if (err || !res.ok) {
              console.log(err);
            } else {
              getResources();
            }
          });
      };

      return (
        <ResourceContainer key={resource._id} resource={resource} deleteResource={deleteResource}>
          {resource.url}
        </ResourceContainer>
      );
    });

    return (
      <div className="resourceList">
        {resourceNodes}
      </div>
    );
  }
});

export default ResourceList;

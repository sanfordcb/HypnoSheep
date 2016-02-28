import React from 'react';
import request from 'superagent';
import ResourceList from '../components/ResourceList';
import ResourceForm from '../components/ResourceForm';
import Paper from 'material-ui/lib/paper';

// Container for resources associated with the selected project
const ProjectPage = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },

  getResources() {
    request
      .get(`/api/resources/${this.props.params.id}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: (resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new resource, a POST request is submitted, and
  // the state is updated to add the new resource to the list
  handleResourceSubmit(resource) {
    resource.projectId = this.props.params.id;
    request
      .post('/api/resources')
      .set('x-access-token', window.localStorage.jwt)
      .send(resource)
      .end((err, resp) => {
        if (!err) {
          console.log('Success!');
          this.setState({ data: this.state.data.concat([resp.body]) });
        } else {
          console.error(err);
        }
      });
  },

  componentDidMount() {
    // Sends get request when component is first rendered, loading any resources already
    // stored for the project
    this.getResources();
  },

  // ResourceBox's handleResourceSubmit method is passed to ResourceForm via this.props object
  // i.e. this.props.handleResourceSubmit
  render() {
    return (
      <div className="resourceBox">
        <Paper style={{ padding: 10 }}>
          <h1>Resources</h1>
          <ResourceForm onResourceSubmit={this.handleResourceSubmit} />
          <ResourceList
            data={this.state.data}
            getResources={this.getResources}
          />
        </Paper>
      </div>
    );
  }
});

export default ProjectPage;

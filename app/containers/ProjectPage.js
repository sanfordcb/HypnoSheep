import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

import ResourceList from '../components/ResourceList';
import ResourceFormModal from '../components/ResourceFormModal';

// Container for resources associated with the selected project
const ProjectPage = React.createClass({
  getInitialState() {
    return {
      data: [],
      formModal: false
    };
  },

  getResources() {
    request
      .get(`/api/resources/${this.props.params.projectName}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: (resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  handleOpen() {
    this.setState({ formModal: true });
  },

  handleClose() {
    this.setState({ formModal: false });
  },

  // When user adds a new resource, a POST request is submitted, and
  // the state is updated to add the new resource to the list
  handleResourceSubmit(resource) {
    resource.projectName = this.props.params.projectName;
    request
      .post('/api/resources')
      .set('x-access-token', window.localStorage.jwt)
      .send(resource)
      .end((err, resp) => {
        if (!err) {
          console.log('Success!');
          console.log('response: ', resp);
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

          <IconButton onClick={this.handleOpen}>
            <AddIcon />
          </IconButton>

          <ResourceList
            data={this.state.data}
            getResources={this.getResources}
          />

        </Paper>

        <ResourceFormModal
          open={this.state.formModal}
          closeModal={this.handleClose}
          handleResourceSubmit={this.handleResourceSubmit}
        />

      </div>
    );
  }
});

export default ProjectPage;

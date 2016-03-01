import React from 'react';
import request from 'superagent';

import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import AddIcon from 'material-ui/lib/svg-icons/content/add-box';

import ProjectList from '../components/ProjectList';
import ProjectFormModal from '../components/ProjectFormModal';
import ProjectSearch from '../components/ProjectSearch';

const ProjectListPage = React.createClass({
  getInitialState() {
    // sets this.state.data to blank
    return {
      data: [],
      formModal: false,
      currentSearch: ''
    };
  },

  componentDidMount() {
    this.loadProjectsFromServer();
  },

  // initiates get request to set this.state.data to whatever is stored in the database
  loadProjectsFromServer() {
    request
      .get(`/api/projects/${this.props.params.userName}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, resp) => {
        if (!err) {
          this.setState({
            data: resp.body.map(project => {
              project.userName = this.props.params.userName;
              return project;
            })
          });
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new project, a POST request is sent, and the new project
  // is added to the list after confirmation from the server that it
  // was successfully created.
  handleProjectSubmit(project) {
    project.userName = this.props.params.userName;
    request
      .post('/api/projects')
      .set('x-access-token', window.localStorage.jwt)
      .send(project)
      .end((err, resp) => {
        if (!err) {
          console.log('response: ', resp);
          resp.body.userName = this.props.params.userName;
          this.setState({ data: this.state.data.concat(resp.body) });
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

  handleSearchReq(term) {
    this.setState({currentSearch: term});
  },

  render() {
    // by having onCommentSubmit={this.handleProjectSubmit} in the ProjectForm tag, we are able to pass
    // ProjectBox's handleProjectSubmit method to ProjectForm on the this.props object. ProjectBox
    // i.e. this.props.handleProjectSubmit
    return (
      <div className="projectBox">

        <Paper style={{ padding: 10 }}>

          <h1>Projects</h1>

          <IconButton onClick={this.handleOpen}>
            <AddIcon />
          </IconButton>

          <ProjectSearch handleSearchReq={this.handleSearchReq}/>
          
          <ProjectList
            data={this.state.data}
            loadProjectsFromServer={this.loadProjectsFromServer}
            currentSearch={this.state.currentSearch}
          />

        </Paper>

        <ProjectFormModal
          open={this.state.formModal}
          closeModal={this.handleClose}
          handleProjectSubmit={this.handleProjectSubmit}
        />

      </div>
    );
  }
});

export default ProjectListPage;

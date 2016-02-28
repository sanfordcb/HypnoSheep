import React from 'react';
import request from 'superagent';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import Paper from 'material-ui/lib/paper';

const ProjectListPage = React.createClass({
  getInitialState() {
    // sets this.state.data to blank
    return { projectId: 0, data: [] };
  },

  componentDidMount() {
    // initiates get request to set this.state.data to whatever is stored in the database
    this.loadProjectsFromServer();
    // if(localStorage.jwt){
    //   request.post('auth/signin').send(localStorage.jwt).end((err, res) => {
    //     if(err || !res.ok){
    //       console.log(err);
    //     } else if(res.text === 'not authorized' || res.text === 'Token Expired'){
    //       console.log(res.text);
    //       browserHistory.push('/signin');
    //     } else {
    //       this.loadProjectsFromServer();
    //     }
    //   });
    // } else {
    //   console.log('not authorized');
    //   browserHistory.push('/signin');
    // }
  },

  loadProjectsFromServer() {
    request
      .get(`/api/projects/${this.props.params.id}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: (resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new project, a POST request is sent, and the new project
  // is added to the list after confirmation from the server that it
  // was successfully created.
  handleProjectSubmit(project) {
    project.userId = this.props.params.id;
    request
      .post('/api/projects')
      .set('x-access-token', window.localStorage.jwt)
      .send(project)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: this.state.data.concat(resp.body) });
        } else {
          console.error(err);
        }
      });
  },

  render() {
    // by having onCommentSubmit={this.handleProjectSubmit} in the ProjectForm tag, we are able to pass
    // ProjectBox's handleProjectSubmit method to ProjectForm on the this.props object. ProjectBox
    // i.e. this.props.handleProjectSubmit
    return (
      <div className="projectBox">
        <Paper style={{ padding: 10 }}>
          <h1>Projects</h1>
          <ProjectForm onProjectSubmit={this.handleProjectSubmit} />
          <ProjectList data={this.state.data} loadProjectsFromServer={this.loadProjectsFromServer} />
        </Paper>
      </div>
    );
  }
});

export default ProjectListPage;

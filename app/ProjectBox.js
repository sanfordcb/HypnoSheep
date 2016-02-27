import React from 'react';
import Project from './Project';
import request from 'superagent';
import { browserHistory } from 'react-router';

// Container for /projects view and functionality
const ProjectBox = React.createClass({
  getInitialState() {
    // sets this.state.data to blank
    return { projectId: 0, data: [] };
  },

  componentDidMount() {
    // initiates get request to set this.state.data with any projects created
    // with this user id
    this.loadProjectsFromServer();
  },

  loadProjectsFromServer() {
    request
      .get(`/api/projects/${this.props.params.id}`)
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
      .send(project)
      .end((err, resp) => {
        if (!err) {
          this.setState({ data: this.state.data.concat(resp.body) });
        } else {
          console.error(err);
        }
      });
  componentDidMount: function() {
    //initiates get request to set this.state.data to whatever is stored in the database
    if(localStorage.jwt){
      request.post('auth/signin').send(localStorage.jwt/*, localStorage.user*/).end((err, res) => {
        if(err || !res.ok){
          console.log(err);
          browserHistory.push('/signin');
        } else if(res.text === 'not authorized' || res.text === 'Token Expired'){
          console.log(res.text);
          browserHistory.push('/signin');
        } else {
          console.log('stored ', localStorage.jwt);
          console.log('user', localStorage.user);
          console.log('new ', res);
          this.loadProjectsFromServer();
        }
      });
    } else {
      console.log('not authorized');
      browserHistory.push('/signin');
    }
  },

  render() {
    // by having onCommentSubmit={this.handleProjectSubmit} in the ProjectForm tag, we are able to pass
    // ProjectBox's handleProjectSubmit method to ProjectForm on the this.props object. ProjectBox
    // i.e. this.props.handleProjectSubmit
    return (
      <div className="projectBox">
        <h1>Projects</h1>
        <ProjectForm onProjectSubmit={this.handleProjectSubmit} />
        <ProjectList data={this.state.data} loadProjectsFromServer={this.loadProjectsFromServer}/>
      </div>
    );
  }
});

const ProjectForm = React.createClass({
  getInitialState() {
    return { name: '' };
  },
  handleProjectChange(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    let projectName = this.state.name.trim();
    if (!projectName) {
      return;
    }
    this.props.onProjectSubmit({ name: projectName });
    this.setState({ name: '' });
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="project"
          placeholder="Say something..."
          value={this.state.name}
          onChange={this.handleProjectChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

const ProjectList = React.createClass({
  render() {
    // render returns an array of Project components by mapping the project objects
    // stored in this.props.data
    if (this.props.data.length === 0) {
      return <div>You haven't added any projects yet.</div>
    }
    const { data, loadProjectsFromServer } = this.props;
    
      const projectNodes = data.map((project) => {
      const deleteProject = () => {
        request
          .delete(`/api/projects/${project._id}`)
          .end((err, res) => {
            if (err || !res.ok) {
              console.log(err);
            } else {
              loadProjectsFromServer();
            }
          });
      };

      return (
        <Project project={project} key={project._id} deleteProject={deleteProject}>
          {project.name}
        </Project>
      );
    });

    return (
      <div className="projectList">
        {projectNodes}
      </div>
    );
  }
});
    
    

export default ProjectBox;

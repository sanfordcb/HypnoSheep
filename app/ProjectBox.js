import $ from 'jquery';
import React from 'react';
import { Link, Router } from 'react-router';
import Project from './Project';
import request from 'superagent';

// Container for /projects view and functionality
const ProjectBox = React.createClass({
  loadProjectsFromServer() {
    request
      .get('/api/projects')
      .end((err, resp) => {
        if(!err) {
          console.log(resp.body);
          this.setState({data: (resp.body)});
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new project, the state is updated to add the new project to the list, and it's
  // added to the database via Post request
  handleProjectSubmit(project) {
    let projects = this.state.data;
    let newProjects = projects.concat([project]);
    this.setState({data: newProjects});
    request
      .post('api/projects')
      .send(project)
      .end((err, resp) => {
        if(!err) {
          console.log('Success!');
        } else {
          console.error(err);
        }
      });
  },

  getInitialState() {
    // sets this.state.data to blank
    return {projectId: 0, data: []};
  },

  componentDidMount() {
    //initiates get request to set this.state.data to whatever is stored in the database
    this.loadProjectsFromServer();
  },

  render() {
    //by having onCommentSubmit={this.handleProjectSubmit} in the ProjectForm tag, we are able to pass
    //ProjectBox's handleProjectSubmit method to ProjectForm on the this.props object. ProjectBox
    //i.e. this.props.handleProjectSubmit
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
    return {name: ''};
  },
  handleProjectChange(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    let projectName = this.state.name.trim();
    if (!projectName) {
      return;
    }
    this.props.onProjectSubmit({name: projectName});
    this.setState({name: ''});
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
      return <div>Loading Projects...</div>
    }
    const { data, loadProjectsFromServer } = this.props;
    
    const projectNodes = data.map((project) => {
      const deleteProject = () => {
        request
          .delete(`/api/projects/${project._id}`)
          .end((err, res) => {
            if(err || !res.ok) {
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

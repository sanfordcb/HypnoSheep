import React from 'react';
import request from 'superagent';
import Project from './Project';

const ProjectList = React.createClass({
  deleteProject(id) {
    request
      .delete(`/api/projects/${id}`)
      .set('x-access-token', window.localStorage.jwt)
      .end((err, res) => {
        if (err || !res.ok) {
          console.log(err);
        } else {
          this.props.loadProjectsFromServer();
        }
      });
  },
  render() {
    // render returns an array of Project components by mapping the project objects
    // stored in this.props.data
    if (this.props.data.length === 0) {
      return <div>You haven't added any projects yet.</div>;
    }
    const { data } = this.props;

    const projectNodes = data.map((project, i) => {
      return (
        <Project
          project={project}
          key={i}
          deleteProject={() =>
            this.deleteProject(project._id)}
        >
          {project.name}
        </Project>
      );
    });

    if(this.props.currentSearch) {
      const results = projectNodes.filter((project) => {
        if(project.props.project.name === this.props.currentSearch) {
          return project;
        }
      });
      return (
        <div className="projectList">
          {results}
        </div>
      );
    } else {
      return (
        <div className="projectList">
          {projectNodes}
        </div>
      );
    }
  }
});

export default ProjectList;

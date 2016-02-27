import React from 'react';
import request from 'superagent';
import ProjectContainer from '../containers/ProjectContainer';

const ProjectList = React.createClass({
  deleteProject(id) {
    request
      .delete(`api/projects/${id}`)
      .end((err, res) => {
        if (err, res) => {
          console.log(err);
        } else {
          loadProjectsFromServer();
        }
      });
  },
  render() {
    // render returns an array of Project components by mapping the project objects
    // stored in this.props.data
    if (this.props.data.length === 0) {
      return <div>You haven't added any projects yet.</div>
    }
    const { data } = this.props;

      const projectNodes = data.map((project) => {
        return (
          <Project
            project={project}
            key={project._id}
            deleteProject={() => 
              this.deleteProject(project._id)}
          >
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

export default ProjectList;
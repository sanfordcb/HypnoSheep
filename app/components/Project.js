import React from 'react';
import { browserHistory, Link } from 'react-router';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

export default ({ project, deleteProject }) => (
  <Paper style={{ margin: 10, padding: 10 }}>
    <Link to={`/app/projects/${project.userName}/${project.name}`}>
      {project.name}
    </Link>
    <FlatButton
      onClick={deleteProject}
      label="Remove Project"
      style={{ margin: 10 }}
    />
  </Paper>
);

import React from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';

export default ({ project, deleteProject }) => (
  <Paper style={{ margin: 10, padding: 10 }}>
    <a
      href={`/resources/${project._id}`}
      style={{ margin: 10, fontSize: 20 }}
    >
      {project.name}
    </a>
    <FlatButton
      onClick={deleteProject}
      label="Remove Project"
      style={{ margin: 10 }}
    />
  </Paper>
);

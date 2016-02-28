import React from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/lib/paper';

export default ({ project, deleteProject }) => (
  <Paper style={{margin: 10, padding: 10}}>
    <a href={`/resources/${project._id}?user=${project.user}`}>{project.name}</a>
    <button onClick={deleteProject}>delete</button>
  </Paper>
);
import React from 'react';
import { link } from 'react-router';

export default ({ project, deleteProject }) => (
  <div>
    <a href={`/resources/${project._id}`}>{project.name}</a>
    <button onClick={deleteProject}>delete</button>
  </div>
);
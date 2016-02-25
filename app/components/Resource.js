import React from 'react';
import { Link } from 'react-router';

// When creating a functional component with
// React, props is passed as the first argument. Thus, we
// can destructure the values we need from props
//              v  v       v       v
export default ({ resource, deleteResource }) => (
  <div>
    <a href={resource.url}>{resource.url}</a>
    <button onClick={deleteResource}> delete </button>
  </div>
);

import React from 'react';
import { Link } from 'react-router';

export default ({ link, deleteLink }) => (
  <div>
    <Link to={`${link.url}`}>{link.url}</Link>
    <button onClick={deleteLink}> delete </button>
  </div>
);

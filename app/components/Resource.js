import React from 'react';

const Editable = ({ editable, content, callback, children }) => {
  if (editable) {
    return <input value={content} />;
  }
  return children;
};

// When creating a functional component with
// React, props is passed as the first argument. Thus, we
// can destructure the values we need from props
//              v  v       v       v
export default ({ resource, deleteResource, toggleEdit, editable }) => (
  <div>
    <button onClick={toggleEdit}> Edit </button>
    <Editable editable={editable} content={resource.url}>
      <a href={resource.url}>{resource.url}</a>
    </Editable>
    {editable ? <button> Save </button> : <button onClick={deleteResource}> delete </button>}
  </div>
);

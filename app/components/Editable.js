import React from 'react';

// NOTES:
//  - This can only handle a single child.
//  - That child must have a 'content' and an 'editKey' prop
const Editable = ({ editable, callback, children }) => {
  const { content, editKey } = children.props;
  if (editable) {
    return (
      <input
        defaultValue={content}
        onChange={(event) => {
          callback(event.target.value, editKey);
        }}
      />
    );
  }
  return children;
};

export default Editable;

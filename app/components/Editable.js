import React from 'react';

// NOTES:
//  - This can only handle a single child.
//  - That child must have a 'content' prop
const Editable = ({ editable, callback, children }) => {
  let input;
  if (editable) {
    return (
      <input
        defaultValue={children.props.content}
        onChange={(event) => {
          callback(event.target.value);
        }}
      />
    );
  }
  return children;
};

export default Editable;

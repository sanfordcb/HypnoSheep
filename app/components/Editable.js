import React from 'react';

import TextField from 'material-ui/lib/text-field';

// NOTES:
//  - This can only handle a single child.
//  - That child must have a 'content' and an 'editKey' prop
const Editable = ({ editable, callback, children }) => {
  const { content, editKey } = children.props;
  if (editable) {
    return (
      <TextField
        defaultValue={content}
        floatingLabelText={editKey}
        onChange={(event) => {
          callback(event.target.value, editKey);
        }}
      />
    );
  }
  return children;
};

export default Editable;

import React from 'react';

import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';

// NOTES:
//  - This can only handle a single child.
//  - That child must have a 'content' and an 'editKey' prop
const Editable = ({ editable, callback, children }) => {
  const { content, editKey } = children.props;
  if (editable) {
    return (
      <div>
        <TextField
          defaultValue={content}
          floatingLabelText={editKey}
          underlineShow={false}
          onChange={event => callback(event.target.value, editKey)}
        />
        <Divider />
      </div>
    );
  }
  return children;
};

export default Editable;

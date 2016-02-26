import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ModeEditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import SaveIcon from 'material-ui/lib/svg-icons/content/save';
import ClearIcon from 'material-ui/lib/svg-icons/content/clear';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';

import Editable from './Editable';

// This Component wraps each child Component in an Editable Component and
//   adds buttons to toggle its "editable" state

// TODO: need a way to abstract what keys are available in the
//   state's `editData` so we can specify that externally
const EditableList = React.createClass({
  getInitialState() {
    const { url, description } = this.props.resource;
    return {
      editData: {
        url,
        description
      },
      editable: false
    };
  },

  toggleEdit() {
    this.setState(
      Object.assign({}, this.state, {
        editable: !this.state.editable
      })
    );
  },

  updateState(val, key) {
    const newData = Object.assign({}, this.state.editData);
    newData[key] = val;
    this.setState(
      Object.assign({}, this.state, {
        editData: newData
      })
    );
  },

  sendState() {
    this.toggleEdit();
    this.props.update(this.state.editData);
  },

  render() {
    const { children, remove } = this.props;
    const { editable } = this.state;
    const buttonStyle = {
      float: 'right',
      display: 'inline-block'
    };
    return (
      <div>

        <IconButton style={buttonStyle} onClick={this.toggleEdit} tooltip={editable ? 'Cancel' : 'Edit'} tooltipPosition="top-right">
          { editable ? <ClearIcon /> : <ModeEditIcon /> }
        </IconButton>

        {editable &&
          <IconButton style={buttonStyle} onClick={this.sendState} tooltip="Save" tooltipPosition="top-right">
            <SaveIcon />
          </IconButton>
        }

        {children.map((child, i) =>
          <Editable key={i} editable={editable} content={child.content} callback={this.updateState}>
            {child}
          </Editable>
        )}

        {editable &&
          <IconButton onClick={remove} tooltip="Delete"tooltipPosition="bottom-left">
            <DeleteIcon />
          </IconButton>
        }


      </div>
    );
  }
});

export default EditableList;

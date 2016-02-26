import React from 'react';
import ModeEditIcon from 'material-ui/lib/svg-icons/editor/mode-edit';
import IconButton from 'material-ui/lib/icon-button';

import Editable from './Editable';

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
    this.props.callback(this.state.editData);
  },

  render() {
    const { children } = this.props;
    const { editable } = this.state;
    const buttonStyle = {
      float: 'right',
      display: 'inline'
    };
    return (
      <div>
        <IconButton style={buttonStyle} onClick={this.toggleEdit} tooltip={editable ? 'cancel' : 'edit'} tooltipPosition="top-right">
          <ModeEditIcon />
        </IconButton>
        {children.map((child, i) =>
          <Editable key={i} editable={editable} content={child.content} callback={this.updateState}>
            {child}
          </Editable>
        )}
        {editable ? <button onClick={this.sendState}> Save </button> : ''}
      </div>
    );
  }
});

export default EditableList;

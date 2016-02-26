import React from 'react';
import Editable from './Editable';

const EditableList = React.createClass({
  getInitialState() {
    const { url, description } = this.props.resource;
    return {
      editData: {
        url,
        description
      }
    };
  },

  updateState(val, key) {
    const newData = Object.assign({}, this.state.editData);
    newData[key] = val;
    this.setState({
      editData: newData
    });
  },

  sendState() {
    this.props.callback(this.state.editData);
  },

  render() {
    const { children, editable, toggle } = this.props;
    return (
      <div>
        {editable ?
          <button onClick={toggle}> Cancel </button> :
          <button onClick={toggle}> Edit </button>
        }
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

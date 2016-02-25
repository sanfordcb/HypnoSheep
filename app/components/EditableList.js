import React from 'react';
import Editable from './Editable';

const EditableList = React.createClass({
  getInitialState() {
    return {
      editData: {
        url: this.props.resource.url,
        description: this.props.resource.description
      }
    };
  },

  updateState(val) {
    this.setState(
      Object.assign(this.state, {
        editData: { url: val }
      })
    );
  },

  render() {
    const { children, editable } = this.props;
    return (
      <div>
        {children.map((child, i) =>
          <Editable key={i} editable={editable} content={child.content} callback={this.updateState}>
            {child}
          </Editable>
        )}
      </div>
    );
  }
});

export default EditableList;

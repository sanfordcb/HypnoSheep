import React from 'react';

// Aiming towards abstracting to an "EditableList" which would
// render an "Editable" for each of its children

// TODO: make a 'stateful button' for our edit/cancel and save/delete buttons

const Editable = ({ editable, content, callback, children }) => {
  let input;
  if (editable) {
    return (
      <input
        defaultValue={content}
        onChange={(event) => {
          callback(event.target.value);
        }}
      />
    );
  }
  return children;
};

window.state = {
  test: ''
};
// When creating a functional component with
// React, props is passed as the first argument. Thus, we
// can destructure the values we need from props
//              v  v       v       v
// export default ({ resource, deleteResource, toggleEdit, editable }) => (
const Resource = React.createClass({
  getInitialState() {
    return {
      editData: {
        url: this.props.resource.url
      },
      editable: false
    };
  },

  toggleEdit() {
    this.setState({
      editable: !this.state.editable
    });
  },

  render() {
    const { resource, deleteResource } = this.props;
    const { editable } = this.state;
    return (
      <div>
        {editable ?
          <button onClick={this.toggleEdit}> Cancel </button> :
          <button onClick={this.toggleEdit}> Edit </button>
        }
        <Editable editable={editable} content={resource.url}
          callback={val => {
            if (val) {
              this.setState(
                Object.assign(this.state, {
                  editData: { url: val }
                })
              );
            }
          }}
        >
          <a href={resource.url}>{resource.url}</a>
        </Editable>
        {editable ?
          <button> Save </button> :
          <button onClick={deleteResource}> delete </button>
        }
      </div>
    );
  }
});

export default Resource;

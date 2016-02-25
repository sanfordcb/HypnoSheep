import React from 'react';

import Editable from './Editable';
import EditableList from './EditableList';

// Aiming towards abstracting to an "EditableList" which would
// render an "Editable" for each of its children

// TODO: make a 'stateful button' for our edit/cancel and save/delete buttons

// When creating a functional component with
// React, props is passed as the first argument. Thus, we
// can destructure the values we need from props
//              v  v       v       v
// export default ({ resource, deleteResource, toggleEdit, editable }) => (
const Resource = React.createClass({
  getInitialState() {
    return {
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

        <EditableList editable={editable} resource={resource}>
          <a content={resource.url} href={resource.url}>{resource.url}</a>
          <div content={resource.description}>{resource.description}</div>
        </EditableList>

        {editable ?
          <button> Save </button> :
          <button onClick={deleteResource}> delete </button>
        }

        <br />
        <br />
      </div>
    );
  }
});

export default Resource;

        // {editable ?
        //   <button onClick={this.toggleEdit}> Cancel </button> :
        //   <button onClick={this.toggleEdit}> Edit </button>
        // }
        // <br />
        // <Editable editable={editable} content={resource.url}
        //   callback={val => {
        //     if (val) {
        //       this.setState(
        //         Object.assign(this.state, {
        //           editData: { url: val }
        //         })
        //       );
        //     }
        //   }}
        // >
        //   <a content={resource.url} href={resource.url}>{resource.url}</a>
        // </Editable>
        // <br />
        // <Editable editable={editable} content={resource.description}
        //   callback={val => {
        //     if (val) {
        //       this.setState(
        //         Object.assign(this.state, {
        //           editData: { description: val }
        //         })
        //       );
        //     }
        //   }}
        // >
        //   <div content={resource.description} >{resource.description}</div>
        // </Editable>

import React from 'react';

import EditableList from './EditableList';

// TODO: make a 'stateful button' for our edit/cancel and save/delete buttons

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

  save(data) {
    this.props.updateResource(
      Object.assign({}, this.props.resource, data)
    );
  },

  render() {
    const { resource, deleteResource } = this.props;
    const { editable } = this.state;
    return (
      <div>
        <EditableList
          editable={editable}
          toggle={this.toggleEdit}
          resource={resource}
          callback={this.save}
        >
          <a content={resource.url} editKey={'url'} href={resource.url}>{resource.url}</a>
          <div content={resource.description} editKey={'description'}>{resource.description}</div>
        </EditableList>

        {editable ? '' : <button onClick={deleteResource}> delete </button>}

        <br />
        <br />
      </div>
    );
  }
});

export default Resource;

import React from 'react';

import EditableList from './EditableList';

import Paper from 'material-ui/lib/paper';

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
    this.toggleEdit();
  },

  render() {
    const { resource, deleteResource } = this.props;
    const { editable } = this.state;
    const style = {
      margin: 5,
      padding: 10
    };

    return (
      <Paper style ={style} zDepth={2}>
        <EditableList
          editable={editable}
          toggle={this.toggleEdit}
          resource={resource}
          callback={this.save}
        >
          <a content={resource.url} editKey={'url'} href={resource.url}>{resource.url}</a>

          <div
            content={resource.description}
            editKey={'description'}
          >
            Description: {resource.description}
          </div>

        </EditableList>

        {editable ? '' : <button onClick={deleteResource}> delete </button>}

        <br />
        <br />
      </Paper>
    );
  }
});

export default Resource;

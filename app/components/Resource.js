import React from 'react';

import EditableList from './EditableList';

import Paper from 'material-ui/lib/paper';
import DeleteIcon from 'material-ui/lib/svg-icons/action/delete';
import IconButton from 'material-ui/lib/icon-button';

// TODO: make a 'stateful button' for our edit/cancel and save/delete buttons

const Resource = React.createClass({
  save(data) {
    this.props.updateResource(
      Object.assign({}, this.props.resource, data)
    );
    this.toggleEdit();
  },

  open(url) {
    // TODO: this is not quite working as intended
    // window.open(url);
    console.log('opening url...');
  },

  render() {
    const { resource, deleteResource } = this.props;
    const style = {
      margin: 5,
      padding: 10
    };

    return (
      <Paper style ={style} zDepth={2} onClick={() => this.open(resource.url)}>

        <EditableList resource={resource} update={this.save}>

          <Paper
            zDepth={1}
            content={resource.url}
            editKey={'url'}
          >
            URL: {resource.url}
          </Paper>

          <Paper
            zDepth={1}
            content={resource.description}
            editKey={'description'}
          >
            Description: {resource.description}
          </Paper>

        </EditableList>

        <IconButton
          onClick={deleteResource}
          tooltip="Delete"
          tooltipPosition="bottom-left"
        >
          <DeleteIcon />
        </IconButton>

      </Paper>
    );
  }
});

export default Resource;

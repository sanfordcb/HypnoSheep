import React from 'react';

import EditableList from './EditableList';

import Paper from 'material-ui/lib/paper';

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
      <Paper style ={style} zDepth={3} onClick={() => this.open(resource.url)}>

        <EditableList resource={resource} update={this.save} remove={deleteResource}>

          <h3 style={{ display: 'inline-block' }} content={resource.url} editKey={'url'}>
            {resource.url}
          </h3>

          <Paper
            style={{ padding: 10 }}
            zDepth={1}
            content={resource.description}
            editKey={'description'}
          >
            Description: {resource.description}
          </Paper>

        </EditableList>

      </Paper>
    );
  }
});

export default Resource;

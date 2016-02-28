import React from 'react';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';

import TextField from 'material-ui/lib/text-field';

const ResourceForm = React.createClass({
  handleSubmit() {
    const url = this.url.getValue();
    const description = this.description.getValue();

    this.props.handleResourceSubmit({ url, description });
    this.props.closeModal();
  },

  render() {
    const buttons = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.props.closeModal}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => {
          this.handleSubmit();
        }}
      />
    ];
    return (
      <Dialog
        title='New Resource'
        actions={buttons}
        modal={true}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >

        <TextField
          style={{ margin: 10 }}
          floatingLabelText={'Website'}
          ref={node => {
            this.url = node;
          }}
        />
        <TextField
          style={{ margin: 10 }}
          floatingLabelText={'Description'}
          ref={node => {
            this.description = node;
          }}
        />

      </Dialog>
    );
  }
});

export default ResourceForm;

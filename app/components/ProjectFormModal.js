import React from 'react';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';


const ProjectForm = React.createClass({
  handleSubmit() {
    const name  = this.name.getValue();

    this.props.handleProjectSubmit({ name });
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
        title='New Project'
        actions={buttons}
        modal={true}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >

        <TextField
          style={{ margin: 10 }}
          floatingLabelText={'Project Name'}
          ref={node => {
            this.name = node;
          }}
        />

      </Dialog>
    );
  }
});

export default ProjectForm;

import React from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const ProjectForm = React.createClass({
  getInitialState() {
    return { name: '' };
  },
  handleProjectChange(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(e) {
    e.preventDefault();
    let projectName = this.state.name.trim();
    if (!projectName) {
      return;
    }
    this.props.onProjectSubmit({ name: projectName });
    this.setState({ name: '' });
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <TextField
          type="project"
          placeholder="Say something..."
          value={this.state.name}
          onChange={this.handleProjectChange}
          style={{margin: 10}}
        />
        <RaisedButton type="submit" label="Post" />
      </form>
    );
  }
});

export default ProjectForm;
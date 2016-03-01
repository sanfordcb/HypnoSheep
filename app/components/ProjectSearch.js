import React from 'react';
import TextField from 'material-ui/lib/text-field';

const ProjectSearch = React.createClass({
  getSearchReq(e) {
    const searchTerm = e.target.value;
    this.props.handleSearchReq(searchTerm);
  },

  render() {
    return (
      <form className='ProjectSearch'>
        <TextField type='Text' onChange={this.getSearchReq} />
      </form>
    );
  }
});

export default ProjectSearch;

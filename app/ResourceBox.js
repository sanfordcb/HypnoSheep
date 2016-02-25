import $ from 'jquery';
import marked from 'marked';
import React from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import Resource from './Resource.js';


// Container for resources associated with the selected project
const ResourceBox = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },

  getResources() {
    request
      .get(`/api/resources/${this.props.params.id}`)
      .end((err, resp) => {
        if(!err) {
          console.log(resp.body);
          this.setState({data: (resp.body)});
        } else {
          console.error(err);
        }
      });
  },

  // When user adds a new resource, a POST request is submitted, and 
  // the state is updated to add the new resource to the list
  handleResourceSubmit(resource) {
    console.log(this.props.params.id);
    resource.projectId = this.props.params.id;
    request
      .post('/api/resources')
      .send(resource)
      .end((err, resp) => {
        if(!err) {
          console.log('Success!');
          this.setState({data: this.state.data.concat([resp.body])});
        } else {
          console.error(err);
        }
      });
    },


  componentDidMount() {
    // Sends get request when component is first rendered, loading any resources already
    // stored for the project
    this.getResources();
  },

  // ResourceBox's handleResourceSubmit method is passed to ResourceForm via this.props object
  // i.e. this.props.handleResourceSubmit
  render() {
    return (
      <div className="resourceBox">
        <h1>Resources</h1>
        <ResourceForm onResourceSubmit={this.handleResourceSubmit} />
        <ResourceList
          data={this.state.data}
          getResources={this.getResources}
        />
      </div>
    );
  }
});

const ResourceForm = React.createClass({
  getInitialState() {
    return {url: ''};
  },
  handleResourceChange(e) {
    this.setState({url: e.target.value});
  },
  handleSubmit(e) {
    e.preventDefault();
    const resource = this.state.url.trim();
    if (!resource) {
      return;
    }
    this.props.onResourceSubmit({url: resource});
    this.setState({url: ''});
  },
  render() {
    return (
      <form className="resourceForm" onSubmit={this.handleSubmit}>
        <input
          type="resource"
          placeholder="Say something..."
          value={this.state.url}
          onChange={this.handleResourceChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

const ResourceList = React.createClass({

  // render returns an array of Resource components by mapping the resource objects
  // stored in this.props.data
  render() {
    const { data, getResources } = this.props;

    const resourceNodes = data.map((resource) => {
      const deleteResource = () => {
        request
          .delete(`/api/resources/${resource._id}`)
          .end((err, res) => {
            if (err || !res.ok) {
              console.log(err);
            } else {
              getResources();
            }
          });
      };

      return (
        <Resource key={resource._id} resource={resource} deleteResource={deleteResource}>
          {resource.url}
        </Resource>
      );
    });

    return (
      <div className="resourceList">
        {resourceNodes}
      </div>
    );
  }
});

export default ResourceBox;

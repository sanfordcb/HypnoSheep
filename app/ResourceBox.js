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
    $.ajax({
      url: `/api/links/${this.props.params.id}`,
      dataType: 'text',
      cache: false,
      type: 'GET',
      success: (data) => {
        this.setState({ data: JSON.parse(data) });
      },
      error: (xhr, status, err) => {
        console.error('/api/links', status, err.toString());
      }
    });
  },

  // When user adds a new resource, a POST request is submitted, and 
  // the state is updated to add the new resource to the list
  handleResourceSubmit(resource) {
    resource.projectId = this.props.params.id;
    $.ajax({
      url: '/api/links',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(resource),
      success: (data) => {
        this.setState({data: this.state.data.concat(data)});
      },
      error: (xhr, status, err) => {
        console.error('/api/projects', status, err.toString());
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
        <h1>Resource</h1>
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
          .delete(`/api/links/${resource._id}`)
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

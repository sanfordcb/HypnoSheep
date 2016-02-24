var $ = require('jquery');
var marked = require('marked');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
import request from 'superagent';
import Resource from './Resource.js';

var LinkBox = React.createClass({
  getInitialState: function() {
    return {
      data: []
    };
  },

  getLinks: function() {
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

  handleLinkSubmit: function(link) {
    link.projectId = this.props.params.id;
    $.ajax({
      url: '/api/links',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(link),
      success: (data) => {
        this.setState({data: this.state.data.concat(data)});
      },
      error: (xhr, status, err) => {
        console.error('/api/projects', status, err.toString());
      }
    });
  },

  componentDidMount: function() {
    this.getLinks();
  },

  render: function() {
    return (
      <div className="linkBox">
        <h1>Link</h1>
        <LinkForm onLinkSubmit={this.handleLinkSubmit} />
        <LinkList
          data={this.state.data}
          getLinks={this.getLinks}
        />
      </div>
    );
  }
});

var LinkForm = React.createClass({
  getInitialState: function() {
    return {url: ''};
  },
  handleLinkChange: function(e) {
    this.setState({url: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var link = this.state.url.trim();
    if (!link) {
      return;
    }
    this.props.onLinkSubmit({url: link});
    this.setState({url: ''});
  },
  render: function() {
    return (
      <form className="linkForm" onSubmit={this.handleSubmit}>
        <input
          type="link"
          placeholder="Say something..."
          value={this.state.url}
          onChange={this.handleLinkChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var LinkList = React.createClass({
  render: function() {
    const { data, getLinks } = this.props;

    var linkNodes = data.map((link) => {
      const deleteLink = () => {
        request
          .delete(`/api/links/${link._id}`)
          .end((err, res) => {
            if (err || !res.ok) {
              console.log(err);
            } else {
              getLinks();
            }
          });
      };
      return (
        <Resource
          key={link._id}
          link={link}
          deleteLink={deleteLink}
        >
          {link.url}
        </Resource>
      );
    });
    return (
      <div className="linkList">
        {linkNodes}
      </div>
    );
  }
});

module.exports = LinkBox;

window.Link = React.createClass({
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="project">
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

window.LinkList = React.createClass({
  render: function() {
    var linkNodes = this.props.data.map(function(project) {
      return (
        <Link key={project.id}>
          {project.project}
        </Link>
      );
    });
    return (
      <div className="projectList">
        {projectNodes}
      </div>
    );
  }
});

window.LinkForm = React.createClass({
  getInitialState: function() {
    return {project: ''};
  },
  handleProjectChange: function(e) {
    this.setState({project: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var project = this.state.project.trim();
    if (!project) {
      return;
    }
    this.props.onCommentSubmit({project: project});
    this.setState({project: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="project"
          placeholder="Say something..."
          value={this.state.project}
          onChange={this.handleProjectChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

window.LinkBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: '/api/projects',
      dataType: 'text',
      cache: false,
      type: 'GET', 
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/projects', status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: '/api/projects',
      contentType: 'application/json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error('/api/projects', status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: [{project: 'someProject1', id: 13123123}, {project: 'someProject2', id: 131232123}, {project: 'someProject3', id: 13123153}, {project: 'someProject4', id: 131231253}]};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Link</h1>
        <LinkForm onCommentSubmit={this.handleCommentSubmit} />
        <LinkList data={this.state.data} />
      </div>
    );
  }
});
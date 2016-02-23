var Link = ReactRouter.Link;

window.LinkBox = React.createClass({
  loadUrl: function(){
    var url = window.location.href;
    var id = url.split('/').pop();
    return id;
  },
  loadLinksFromServer: function() {
    $.ajax({
      url: '/api/links/' + this.state.projectId,
      dataType: 'text',
      cache: false,
      type: 'GET', 
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/links', status, err.toString());
      }.bind(this)
    });
  },
  handleLinkSubmit: function(link) {
    var links = this.state.data;
    var newLinks = links.concat([link]);
    this.setState({data: newLinks});
    $.ajax({
      url: '/api/links',
      contentType: 'application/json',
      type: 'POST',
      data: link,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: links});
        console.error('/api/projects', status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {projectId:0, data: [{url: 'http://www.google.com', _id: 13123123}, {url: 'http://www.bing.com', _id: 131232123}, {url: 'http://www.yahoo.com', _id: 131231253}]};
  },
  componentDidMount: function() {
    var projectId = this.loadUrl();
    this.setState({projectId: projectId});

    //this.loadLinksFromServer();
    //setInterval(this.loadLinksFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="linkBox">
        <h1>Link</h1>
        <LinkForm onLinkSubmit={this.handleLinkSubmit} />
        <LinkList data={this.state.data} />
      </div>
    );
  }
});


window.LinkForm = React.createClass({
  getInitialState: function() {
    return {url: ''};
  },
  handleLinkChange: function(e) {
    this.setState({url: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var link = this.state.link.trim();
    if (!link) {
      return;
    }
    this.props.onLinkSubmit({link: link});
    this.setState({link: ''});
  },
  render: function() {
    return (
      <form className="linkForm" onSubmit={this.handleSubmit}>
        <input
          type="link"
          placeholder="Say something..."
          value={this.state.link}
          onChange={this.handleLinkChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

window.LinkList = React.createClass({
  render: function() {
    var linkNodes = this.props.data.map(function(link) {
      return (
        <LinkItem link={link} key={link._id}>
          {link.url}
        </LinkItem>
      );
    });
    return (
      <div className="linkList">
        {linkNodes}
      </div>
    );
  }
});

window.LinkItem = React.createClass({
  render: function() {
    console.log('Link props, ', this.props);
    return (
      <div className="link">
        <Link to={`${this.props.link.url}`}>{this.props.link.url}</Link>
      </div>
    );
  }
});



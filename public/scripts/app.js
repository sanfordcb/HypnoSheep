var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;


var App = React.createClass({
  render: function() {
    return(
    <div>
      {this.props.children}
    </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="projects" component={ProjectBox} />
      <Route path="links/:id" component={LinkBox} />
    </Route>
  </Router>), document.getElementById('content'));

<!-- var projects = require('./projects');
var links = require('./links');
var signin = require('./signin');
var signup = require('./signup');

var app = react.createClass({
  render: function() {
    {this.props.children};
  }
})

render((
  <Router>
    <Route path="/" component={App}>
      <Route path="signin" component={signin} />
      <Route path="signup" component={Signup} />
      <Route path="projects" component={Projects} />
      <Route path="links" component={Links} />
    </Route>
  </Router>), document.getElementById('content'));
      
      <Route path="signin" component={signin} />
      <Route path="signup" component={Signup} />
      <Route path="links" component={Links} />
      <Route path="projects" component={Project} />
      <Router>
    <Route path="/" component={App}>
    </Route>
  </Router>)


signin sends a token. store token locally. set x-access-token to locally stored token
window.localStorage.setItem('token', 'the-long-access-token')
var token = window.localStorage.getItem('token')
 -->
// 3rd Party
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Project
import LandingPage from './LandingPage';
import App from './App';
import ProjectBox from './ProjectBox';
import ProjectPage from './containers/ProjectPage';
import SignupForm from './SignupForm';
import SignIn from './SignIn';


// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="projects/:id" component={ProjectBox} />
      <Route path="resources/:id" component={ProjectPage} />
      <Route path="signup" component={SignupForm} />
      <Route path="signin" component={SignIn} />
    }
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

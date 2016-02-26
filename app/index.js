import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import LandingPage from './LandingPage';
import App from './App';
import ProjectBox from './ProjectBox';
import ProjectPage from './containers/ProjectPage';
import SignupForm from './SignupForm';
import SignIn from './SignIn';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={LandingPage} />
      <Route path="projects" component={ProjectBox} />
      <Route path="resources/:id" component={ProjectPage} />
      <Route path="signup" component={SignupForm} />
      <Route path="signin" component={SignIn} />
    }
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

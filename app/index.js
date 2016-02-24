import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './App';
import ProjectBox from './ProjectBox';
import LinkBox from './LinkBox';
import SignupForm from './SignupForm';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="projects" component={ProjectBox} />
      <Route path="links/:id" component={LinkBox} />
      <Route path="signup" component={SignupForm} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

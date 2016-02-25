import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import App from './App';
import ProjectBox from './ProjectBox';
import ResourceBox from './ResourceBox';
import SignupForm from './SignupForm';
import SignIn from './SignIn';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="projects" component={ProjectBox} />
      <Route path="resources/:id" component={ResourceBox} />
      <Route path="signup" component={SignupForm} />
      <Route path="signin" component={SignIn} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));

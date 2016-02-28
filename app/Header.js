import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

const Header = React.createClass({
  _toggle(e) {
    e.preventDefault();
    this.refs.LeftNav.toggle();
  },
  handleMyProjects() {
    browserHistory.push(`/app/projects/${localStorage.userId}`);
  },
  handleSignOut() {
    console.log('You are now signed out');
    localStorage.clear();
    browserHistory.push('/');
  },
  render() {
    return (
      <div>
        <AppBar onLeftIconButtonTouchTap={this._toggle} title="Where Was I?" />
        <LeftNav
          ref="LeftNav"
          docked={false}
          handleHome={this.handleMyProjects}
          handleSignOut={this.handleSignOut}
        >
          <MenuItem onTouchTap={this.handleMyProjects}>My Projects</MenuItem>
          <MenuItem onTouchTap={this.handleSignOut}>Sign Out</MenuItem>
        </LeftNav>
      </div>
    );
  }
});

export default Header;
import React, { Component } from 'react';
import './App.css';
import Notifications from 'react-notify-toast';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid d-flex flex-column">
        <Notifications />
        <Router>
          <Switch>
            <Route path="/(|react-test)/" exact component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

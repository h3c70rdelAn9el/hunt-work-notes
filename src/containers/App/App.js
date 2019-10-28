import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../../components/Auth/Home';
import Login from '../../components/Auth/Login';
import SignUp from '../../components/Auth/SignUp';
import { AuthProvider } from '../../Auth';
import PrivateRoute from '../../PrivateRoute';
import Create from '../../components/Create';
import Edit from '../../components/Edit';
import Show from '../../components/Show';

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <PrivateRoute path="/create" component={Create} />
            <PrivateRoute path="/edit" component={Edit} />
            <PrivateRoute exact path={`/show/:{proposal.key}`} component={Show} />
          </div>
        </Router>
      </AuthProvider>
    )
  }
}


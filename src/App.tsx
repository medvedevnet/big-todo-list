import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppNavbar } from './AppNavbar';
import { routes } from './utils/routes';

const App = () => (
  <Router>
    <AppNavbar />
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path} component={Component} />
      ))}
    </Switch>
  </Router>
);

export default App;

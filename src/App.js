import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'

// Containers
import { Layout } from './containers';
// Pages
import { Page404, Page500 } from './views/Pages';
import Login from './containers/Login'

// import { renderRoutes } from 'react-router-config';

import { Callback, PrivateRoute } from 'react-django';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/callback" name="Callback" component={Callback} />
          <PrivateRoute path="/" name="Home" component={Layout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

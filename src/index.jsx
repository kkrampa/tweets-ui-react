import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';
import HomeComponent from './components/HomeComponent.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import RegisterComponent from './components/RegisterComponent.jsx';

import AuthService from './services/AuthService';

import axios from 'axios';

const authService = new AuthService();

axios.interceptors.request.use(config => {
  var token = authService.getToken();

  if (token) {
    config.headers['authorization'] = 'JWT ' + token;
  }

  return config;
});

function requireAuth(nextState, replace) {
  if (!authService.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

render(
  <AppContainer>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={HomeComponent} onEnter={requireAuth}/>
        <Route path="login" component={LoginComponent}/>
        <Route path="register" component={RegisterComponent}/>
      </Route>
    </Router>
  </AppContainer>, 
  document.querySelector("#app")
);

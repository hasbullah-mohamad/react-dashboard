'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Auth = require('./Auth');

exports.default = {
  login: _Auth.login,
  logout: _Auth.logout,
  authHeader: _Auth.authHeader,
  getCallbackUri: _Auth.getCallbackUri,
  isLoggedIn: _Auth.isLoggedIn,
  scheduleRenewal: _Auth.scheduleRenewal,
  setAccessToken: _Auth.setAccessToken,
  setExpiresAt: _Auth.setExpiresAt,
  setStayLoggedIn: _Auth.setStayLoggedIn,
  getStayLoggedIn: _Auth.getStayLoggedIn
};
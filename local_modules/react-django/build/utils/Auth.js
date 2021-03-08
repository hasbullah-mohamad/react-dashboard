'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = login;
exports.logout = logout;
exports.requireAuth = requireAuth;
exports.getIdToken = getIdToken;
exports.getAccessToken = getAccessToken;
exports.getExpiresAt = getExpiresAt;
exports.getStayLoggedIn = getStayLoggedIn;
exports.clearStayLoggedIn = clearStayLoggedIn;
exports.setAccessToken = setAccessToken;
exports.setIdToken = setIdToken;
exports.setExpiresAt = setExpiresAt;
exports.setStayLoggedIn = setStayLoggedIn;
exports.isLoggedIn = isLoggedIn;
exports.authHeader = authHeader;
exports.getCallbackUri = getCallbackUri;
exports.scheduleRenewal = scheduleRenewal;
var ID_TOKEN_KEY = 'id_token';
var ACCESS_TOKEN_KEY = 'access_token';
var EXPIRES_AT_KEY = 'expires_at';
var STAY_LOGGED_IN = 'stay_logged_in';

var CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
var API = process.env.REACT_APP_AUTH;

var tokenRenewalTimeout = null;

function login() {

  var redirect = void 0;
  if (window.location.port) {
    redirect = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + '/callback';
  } else {
    redirect = window.location.protocol + '//' + window.location.hostname + '/callback';
  }

  var authorizeUrl = API + ('o/authorize/?grant_type=implicit&response_type=token&client_id=' + CLIENT_ID + '&redirect_uri=' + redirect);

  window.location.href = authorizeUrl;
}

function logout() {
  fetch(API + 'o/revoke_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'token=' + getAccessToken() + '&client_id=' + CLIENT_ID
  }).catch(function (error) {
    return console.error('Error:', error);
  }).then(function (response) {
    if (response) {
      if (response.ok) {
        clearAccessToken();
        clearExpiresAt();
        clearStayLoggedIn();
        clearTimeout(tokenRenewalTimeout);
        window.location.href = API + 'accounts/logout/';
      }
    } else {
      console.log(response);
    }
  });
}

function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
}

function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function getExpiresAt() {
  return localStorage.getItem(EXPIRES_AT_KEY);
}

function getStayLoggedIn() {
  return localStorage.getItem(STAY_LOGGED_IN);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearExpiresAt() {
  localStorage.removeItem(EXPIRES_AT_KEY);
}

function clearStayLoggedIn() {
  localStorage.removeItem(STAY_LOGGED_IN);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken() {
  var accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
function setIdToken() {
  var idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

// Get and store expires_at in local storage
function setExpiresAt() {
  var expiresIn = parseInt(getParameterByName('expires_in'), 10);
  var expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
}

function setStayLoggedIn() {
  localStorage.setItem(STAY_LOGGED_IN, true);
}

function isLoggedIn() {
  var accessToken = getAccessToken();
  var expiresAt = getExpiresAt();

  var expiresAtDate = new Date(parseInt(expiresAt));
  var isExpired = Date.now() > expiresAtDate;

  return !!accessToken && !!expiresAt && !isExpired;
}

function authHeader() {
  return "Bearer " + getAccessToken();
}

function getCallbackUri() {
  var callbackUri = localStorage.getItem('callback_uri');
  if (callbackUri) {
    return callbackUri;
  } else {
    return null;
  }
}

function scheduleRenewal() {
  var expiresAt = getExpiresAt();
  var delay = expiresAt - Date.now();
  if (delay > 0) {
    tokenRenewalTimeout = setTimeout(function () {
      login();
    }, delay);
  }
}
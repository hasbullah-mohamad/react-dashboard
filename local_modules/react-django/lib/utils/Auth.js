const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const EXPIRES_AT_KEY = 'expires_at';
const STAY_LOGGED_IN = 'stay_logged_in';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const API = process.env.REACT_APP_AUTH;

let tokenRenewalTimeout = null;


export function login() {

  let redirect;
  if (window.location.port) {
    redirect = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/callback`;
  } else {
    redirect = `${window.location.protocol}//${window.location.hostname}/callback`;
  }
  
  const authorizeUrl = API + `o/authorize/?grant_type=implicit&response_type=token&client_id=${CLIENT_ID}&redirect_uri=${redirect}`;
  
  window.location.href = authorizeUrl;

}

export function logout() {
  fetch(API + 'o/revoke_token/' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `token=${getAccessToken()}&client_id=${CLIENT_ID}`
  })
  .catch(error => console.error('Error:', error))
  .then((response) => {
    if (response) {
      if (response.ok) {
        clearAccessToken();
        clearExpiresAt();
        clearStayLoggedIn();
        clearTimeout(tokenRenewalTimeout);
        window.location.href = API + 'accounts/logout/'
      }
    } else {
      console.log(response);
    }
  });
}

export function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({pathname: '/'});
  }
}

export function getIdToken() {
  return localStorage.getItem(ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getExpiresAt() {
  return localStorage.getItem(EXPIRES_AT_KEY);
}

export function getStayLoggedIn() {
  return localStorage.getItem(STAY_LOGGED_IN);
}

function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

function clearExpiresAt() {
  localStorage.removeItem(EXPIRES_AT_KEY);
}

export function clearStayLoggedIn() {
  localStorage.removeItem(STAY_LOGGED_IN);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(ID_TOKEN_KEY, idToken);
}

// Get and store expires_at in local storage
export function setExpiresAt() {
  const expiresIn = parseInt(getParameterByName('expires_in'), 10);
  let expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem(EXPIRES_AT_KEY, expiresAt);
}

export function setStayLoggedIn() {
  localStorage.setItem(STAY_LOGGED_IN, true);
}

export function isLoggedIn() {
  const accessToken = getAccessToken();
  const expiresAt = getExpiresAt();

  const expiresAtDate = new Date(parseInt(expiresAt))
  const isExpired = (Date.now() > expiresAtDate)

  return (!!accessToken && !!expiresAt && !isExpired);
}

export function authHeader() {
  return ("Bearer " + getAccessToken())
}

export function getCallbackUri() {
  const callbackUri = localStorage.getItem('callback_uri');
  if (callbackUri) {
    return callbackUri;
  } else {
    return null;
  }
}

export function scheduleRenewal() {
  const expiresAt = getExpiresAt();
  const delay = expiresAt - Date.now();
  if (delay > 0) {
    tokenRenewalTimeout = setTimeout(() => {
      login();
    }, delay);
  }
}

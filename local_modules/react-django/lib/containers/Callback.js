import React from 'react';

import Auth from '../utils';


class Callback extends React.Component {

  componentDidMount() {
    Auth.setAccessToken();
    Auth.setExpiresAt();
    
    const callbackUri = Auth.getCallbackUri();
    console.log(callbackUri)
    if (callbackUri && callbackUri !== '/login') { 
      window.location.href = callbackUri;
    } else { 
      window.location.href = "/";
    }  
  }

  render() {
    return null;
  }
}

export default Callback;
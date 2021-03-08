import React from "react";
import { Route, withRouter } from "react-router-dom";
import Auth from "../utils"


const PrivateRoute = withRouter(({ history, component: Component, render: Render, ...rest }) => {
  if (Auth.isLoggedIn()) {
    return (
      <Route
        {...rest}
        render={props =>
          (
            ( Component
              ? <Component {...props} />
              : Render(props)
            )
          )
        }
      />
    )
  } else {
    if (Auth.getStayLoggedIn()) {
      localStorage.setItem('callback_uri', window.location.pathname);
      Auth.login();
    } else {
      localStorage.setItem('callback_uri', window.location.pathname);
      history.push('/login');
    }
    return null
  }
})


export default PrivateRoute;

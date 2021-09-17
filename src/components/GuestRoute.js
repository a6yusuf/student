import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import {useSelector} from 'react-redux';

const GuestRoute = ({ children, ...rest }) => {
    // const auth = useSelector((state) => state.auth);
    const auth = JSON.parse(localStorage.getItem("auth"));
    let loggedIn = auth ? auth?.loggedIn : false;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          !loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
  export default GuestRoute;
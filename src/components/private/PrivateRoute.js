import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import _ from 'underscore';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

  const { currentUser } = useContext(UserContext);

  return (
    <Route
      {...otherProps}
      render={props => (
        (
          !_.isEmpty(currentUser)
            ?
            <Component {...props} />
            :
            <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/signinup'} />
        )
      )}
    />
  )
}


export default PrivateRoute;
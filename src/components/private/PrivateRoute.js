import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import _ from 'underscore';
import Loading from "../global/Loading";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { currentUser, isLoading } = useContext(UserContext);

  return (
    <Route
      {...otherProps}
      render={props => (
        (
            !isLoading ?
                (
          !_.isEmpty(currentUser)
            ?
            <Component {...props} />
            :
            <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/signinup'} />
                )
            :
                <Loading />
        )
      )}
    />
  )
}

export default PrivateRoute;
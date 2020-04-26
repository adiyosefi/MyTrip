import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const currentUserState  = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUserState ? (
          <RouteComponent {...routeProps} />
        ) : ( 
          <Redirect to={"/signin"} />
        )
      }
    />
  );
};

export default PrivateRoute;
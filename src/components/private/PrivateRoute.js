import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Loading from './../global/Loading';


const PrivateRoute = ({ component: RouteComponent, ...rest }) => {

  const [isLoading, setIsLoading] = useState(true);

  const currentUserState = useContext(UserContext);

  useEffect(() => {
    
  }, []);

  if (currentUserState) {
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
 }
  // return spinner
  return (
     <Loading />
   );
  
};

export default PrivateRoute;
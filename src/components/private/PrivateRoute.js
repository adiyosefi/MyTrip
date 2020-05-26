import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Loading from './../global/Loading';
import { UserContext } from "../../context/user";
import _ from 'underscore';

const PrivateRoute = ({ component: Component, ...otherProps }) => {

  //const { isAuthenticated, isLoading } = useContext(AuthContext)

  const {currentUser, isLoading} = useContext(UserContext);

  //const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);



  console.log("from privateroute ", currentUser,"user", isLoading, "loading");

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

  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let mounted = true;
  //   if (!mounted){
  //     return (
  //         <Loading />
  //      );
  //   }
  //   if(mounted){
  //   fetchUser();
  //   }

  //   return () => mounted = false;
  // }, []);
  
  // return spinner
  // return (
  //    <Loading />
  //  );
  

export default PrivateRoute;
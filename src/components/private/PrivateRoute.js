import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import Loading from './../global/Loading';
import SignIn from "./../auth/SignIn/SignIn";

const PrivateRoute = ({ component: Component, ...otherProps }) => {


  const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <Route
            {...otherProps}
            render={props => (
                !isLoading
                    ?
                    (
                        isAuthenticated
                            ?
                            <Component {...props} />
                            :
                            <Redirect to={otherProps.redirectTo ? otherProps.redirectTo : '/signinup'} />
                    )
                    :
                    <Loading />
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
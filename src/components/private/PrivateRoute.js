import React, { useContext, useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user";
import Loading from './../global/Loading';
import SignIn from "./../auth/SignIn/SignIn";

const PrivateRoute = ({ component, ...options }) => {


  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    
  }, []);

    const currentUserState = useContext(UserContext);
    const finalComponent = currentUserState ? component : SignIn;
  
    return <Route {...options} component={finalComponent} />;
  
  

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
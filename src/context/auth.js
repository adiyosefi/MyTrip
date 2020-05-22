import React, { useEffect, useState, createContext } from "react";
import {auth, generateUserDocument} from '../server/firebase';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true;
    if(mounted){
        checkAuth();
    }
    return () => mounted = false;
  }, []);

  const checkAuth = () => {
    auth.onAuthStateChanged(async userAuth => {
        const user = await generateUserDocument(userAuth);
        console.log("user in auth context ", user);
        if (user) {
          setIsLoading(false);
          setIsAuthenticated(true);
        } else {
          setIsLoading(false);
          setIsAuthenticated(false);
        }
        console.log("from auth context ", isLoading,"isloading", isAuthenticated, "isauthenticated");
      })
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading, isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import React, { useEffect, useState, createContext } from "react";
import {auth, generateUserDocument} from '../server/firebase';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true;
    if(mounted){
    fetchUser();
    }

    return () => mounted = false;
  }, []);

  const fetchUser = () => {
    auth.onAuthStateChanged(async userAuth => {
        const user = await generateUserDocument(userAuth);
        console.log(user)
        setCurrentUser(user);
      })
      //console.log(currentUserState);
  };

  return (
    <UserContext.Provider
      value={
        currentUser
      }
    >
      {children}
    </UserContext.Provider>
  );
};

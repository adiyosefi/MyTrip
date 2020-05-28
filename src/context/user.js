import React, { useEffect, useState, createContext } from "react";
import {auth, generateUserDocument} from '../server/firebase';

const defaultUser = {};
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  console.log(currentUser);
  const [isLoading, setIsLoading] = useState(true);


  function onAuthStateChange(setCurrentUser) {
    return auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const user = await generateUserDocument(userAuth);
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }
      setIsLoading(false);
    });
  }

  useEffect(() => {
   onAuthStateChange(setCurrentUser);
  }, []);


  return (
    <UserContext.Provider
      value={{
        currentUser, isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

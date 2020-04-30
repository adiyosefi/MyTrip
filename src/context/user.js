import React, { useEffect, useState, createContext } from "react";
import {auth, generateUserDocument} from '../server/firebase';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUserState, setCurrentUser] = useState(null);

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
      });
      //console.log(currentUserState);
  };

  return (
    <UserContext.Provider
      value={
        currentUserState
      }
    >
      {children}
    </UserContext.Provider>
  );
};

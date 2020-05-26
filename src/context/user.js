import React, { useEffect, useState, createContext } from "react";
import {auth, generateUserDocument} from '../server/firebase';

const defaultUser = {};
export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(defaultUser);

  console.log(currentUser);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let mounted = true;
  //   if(mounted){
  //   fetchUser();
  //   }

  //   return () => mounted = false;
  // }, []);

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

  // const fetchUser = () => {
  //   auth.onAuthStateChanged(async userAuth => {
  //       const user = await generateUserDocument(userAuth);
  //       console.log(user)
  //       setCurrentUser({
  //         userInfo: user,
  //         loggedIn: !!userAuth
  //       });
  //       console.log(currentUser);
  //     })
  // };

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

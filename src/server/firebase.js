
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { Redirect } from 'react-router-dom';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARBtk7HSSb-K9G4u8I57YZPLeaoHd_gow",
  authDomain: "equiomentlist.firebaseapp.com",
  databaseURL: "https://equiomentlist.firebaseio.com",
  projectId: "equiomentlist",
  storageBucket: "equiomentlist.appspot.com",
  messagingSenderId: "207522967360",
  appId: "1:207522967360:web:a090eed9bef331d47214a5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

/*
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
*/

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();

// an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

// users sign in with email and password
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};


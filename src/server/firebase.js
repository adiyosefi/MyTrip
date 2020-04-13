import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

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
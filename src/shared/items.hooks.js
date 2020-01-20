import {useState, useEffect, useCallback} from 'react';
import {values} from 'lodash/fp';
import firebase from 'firebase';

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
firebase.initializeApp(firebaseConfig);

export const useItems = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        firebase.database().ref('/tasks').on('value', snapshot => {
            setState(values(snapshot.val()));
        });

        return () => firebase.database().ref('/tasks').off();
    }, []);

    const syncItems = useCallback(data => {
        firebase.database().ref('/items').set(data);
    }, []);

    return [state, syncItems];
};

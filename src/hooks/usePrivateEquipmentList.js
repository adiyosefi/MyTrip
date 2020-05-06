import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../server/firebase';


export const usePrivateEquipmentList = (user) => {

    const [items, setItems] = useState([]); //useState() hook, sets initial state to an empty array

    const userRef = firestore.doc(`users/${user.uid}`);

    useEffect(() => {
        userRef.onSnapshot(function(doc) {
            if (doc.data().privateequipmentlist){
            console.log("Current data: ", doc.data());
            setItems(doc.data().privateequipmentlist);
            }
        });
    }, []);

    const syncItems = useCallback(data => {
        console.log(data);
        userRef.update({
            privateequipmentlist: data
        })
            .then(function () {
                console.log("User document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating user document: ", error);
            });
    }, []);

    return [items, syncItems];
};
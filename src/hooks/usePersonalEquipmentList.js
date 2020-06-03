import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../server/firebase';

export const usePersonalEquipmentList = (user) => {
    const [items, setItems] = useState([]);

    const userRef = firestore.doc(`users/${user.uid}`);

    useEffect(() => {
        userRef.onSnapshot(function(doc) {
            if (doc.data().personalequipmentlist){
                setItems(doc.data().personalequipmentlist);
            }
        });
    }, []);

    const syncItems = useCallback(data => {
        userRef.update({
            personalequipmentlist: data
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
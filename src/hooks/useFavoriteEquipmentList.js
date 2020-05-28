import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../server/firebase';

export const useFavoriteEquipmentList = (user) => {

    const [items, setItems] = useState([]);

    const userRef = firestore.doc(`users/${user.uid}`);

    useEffect(() => {
        userRef.onSnapshot(function(doc) {
            if (doc.data().trip) {
            if (doc.data().trip.favoriteequipmentlist){
            console.log("Current data: ", doc.data());
            setItems(doc.data().trip.favoriteequipmentlist);
            }
        }
    });
    }, []);

    const syncItems = useCallback(data => {
        console.log(data);
        userRef.update({
            trip: {
                ...user.trip,
                favoriteequipmentlist: data
            }
        })
            .then(function () {
                console.log("Trip document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating trip document: ", error);
            });
    }, []);

    return [items, syncItems];
};
import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../server/firebase';


export const useTrip = (trip) => {

    const [trip, setTrip] = useState([]); //useState() hook, sets initial state to an empty array

    const tripRef = firestore.doc(`trips/${trip.tid}`);

    useEffect(() => {
        tripRef.onSnapshot(function(doc) {
            if (doc.data().privateequipmentlist){
            console.log("Current data: ", doc.data());
            setTrip(doc.data());
            }
        });
    }, []);

    const syncTrip = useCallback(data => {
        console.log(data);
        tripRef.set({
            data
        })
            .then(function () {
                console.log("Trip document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating trip document: ", error);
            });
    }, []);

    return [trip, syncTrip];
};
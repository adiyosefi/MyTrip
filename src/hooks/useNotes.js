import { useState, useEffect, useCallback } from 'react';
import { firestore } from '../server/firebase';

export const useNotes = (user) => {

    const [notes, setNotes] = useState("");

    const userRef = firestore.doc(`users/${user.uid}`);

    useEffect(() => {
        userRef.onSnapshot(function(doc) {
            if (doc.data().trip){
            console.log("Current data: ", doc.data());
            setNotes(doc.data().trip.notes);
            }
        });
    }, []);

    const syncNotes = useCallback(data => {
        console.log(data);
        userRef.update({
            trip: {
                ...user.trip,
                notes: data
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

    return [notes, syncNotes];
};
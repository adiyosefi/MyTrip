
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { Redirect } from 'react-router-dom';
import { useItems } from "../hooks/useItems";

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
export const storage = firebase.storage();

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
const getUserDocument = async uid => {
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

// create trip
export const generateTripDocument = async (user, destination, start, end) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
    try {
      await userRef.update({
        trip: {
          destination: destination,
          start: start, 
          end: end
        }
      });
    } catch (error) {
      console.error("Error updating user document", error);
    }
  
  return userRef;
};
// const updateUserAddNewTrip = (userRef,tripRef) => {
//   return userRef.update({
//     trip: tripRef
// })
// .then(function() {
//     console.log("User document successfully updated!");
// })
// .catch(function(error) {
//     // The document probably doesn't exist.
//     console.error("Error updating user document: ", error);
// });
// }

// get trip data from document
// export const getTripDocument = async tid => {
//   if (!tid) return null;
//   try {
//     const tripDocument = await firestore.doc(`trips/${tid}`).get();
//     return {
//       tid,
//       ...tripDocument.data()
//     };
//   } catch (error) {
//     console.error("Error fetching trip", error);
//   }
// };

export const deleteTripFromUser = (user, trip) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  return userRef.update({
    trip: null
})
.then(function() {
    console.log("User document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating user document: ", error);
});
}
// export const deleteTripFromTrips = (trip) => {
//   const tripRef = firestore.doc(`trips/${trip.tid}`);
//   return tripRef.delete().then(function() {
//     console.log("Document successfully deleted!");
// }).catch(function(error) {
//     console.error("Error removing document: ", error);
// });
// }


// generate public equipment list document
export const generatePublicEquipmentListDocument = async (displayName, destination, season, category, equipmentList) => {
  var equipmentListRef = firestore.collection("equipmentlists").doc();
    try {
      await equipmentListRef.set({
        displayName: displayName,
        destination: destination,
        season: season, 
        category: category,
        list: equipmentList
      });
    } catch (error) {
      console.error("Error creating equipmentlist document", error);
    }
  return equipmentListRef;
}

// search public equipment lists
export const searchPublicEquipmentListDocuments = async (destination, season, category) => {
  var equipmentlistsRef = firestore.collection("equipmentlists");
  var destinationQuery = equipmentlistsRef.where("destination", "==", destination);
  var seasonQuery = equipmentlistsRef.where("season", "==", season);
  var categoryQuery = equipmentlistsRef.where("category", "==", category);
  var searchResults;
  var searchResultsArray = [];
  if (!destination && !season && !category) {
    searchResults = equipmentlistsRef;
  } else if (destination && season && category){
    searchResults = destinationQuery.seasonQuery.categoryQuery;
  } else if (destination && season && !category) {
    searchResults = destinationQuery.seasonQuery;
  } else if (destination && category && !season) {
    searchResults = destinationQuery.categoryQuery;
  } else if (season && category && !destination) {
    searchResults = seasonQuery.categoryQuery;
  } else if (destination && !season && !category) {
    searchResults = destinationQuery;
  } else if (season && !destination && !category) {
    searchResults = seasonQuery;
  } else if (category && !destination && !season) {
    searchResults = categoryQuery;
  } 
  const querySnapshot = await searchResults.get();
  querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        searchResultsArray.push({id: doc.id, data: doc.data()});
  });
  return searchResultsArray;
}

// add notes field to user's trip
export const addNotesFieldToTrip = (user, notes) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  return userRef.update({
    trip: {
      ...user.trip,
      notes: notes
    }
})
.then(function() {
    console.log("Trip document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating trip document: ", error);
});
}



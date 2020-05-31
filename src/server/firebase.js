
import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore


// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)


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



// add favorite equipment list field to user's trip
export const addFavoriteEquipmentListToUserTrip = (user, items) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  return userRef.update({
    trip: {
      ...user.trip,
      favoriteequipmentlist: items
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



export const searchActivitiesDocuments = async (activityName, destination, season, category) => {
  var activitiesRef = firestore.collection("activities");
  var nameQuery = activitiesRef.where('activityName', '>=', activityName).where('activityName', '<=', activityName+ '\uf8ff');
  var destinationQuery = activitiesRef.where("destination", "==", destination);
  var seasonQuery = activitiesRef.where("season", "==", season);
  var categoryQuery = activitiesRef.where("category", "==", category);
  var searchResults;
  var searchResultsArray = [];
  if (!activityName && !destination && (!season || season === 'All year round') && !category) {
    searchResults = activitiesRef;
  } else if (activityName && destination && season && category){
    searchResults = nameQuery.destinationQuery.seasonQuery.categoryQuery;
  } else if (activityName && destination && season && !category) {
    searchResults = nameQuery.destinationQuery.seasonQuery;
  } else if (activityName && destination && category && (!season || season === 'All year round')) {
    searchResults = nameQuery.destinationQuery.categoryQuery;
  } else if (activityName && season && category && !destination) {
    searchResults = nameQuery.seasonQuery.categoryQuery;
  } else if (!activityName && season && category && destination) {
    searchResults = destinationQuery.seasonQuery.categoryQuery;
  } else if (activityName && destination && (!season || season === 'All year round') && !category) {
    searchResults = nameQuery.destinationQuery;
  } else if (activityName && season && !destination && !category) {
    searchResults = nameQuery.seasonQuery;
  } else if (activityName && category && !destination && (!season || season === 'All year round')) {
    searchResults = nameQuery.categoryQuery;
  } else if (!activityName && category && destination && (!season || season === 'All year round')) {
    searchResults = destinationQuery.categoryQuery;
  } else if (!activityName && category && !destination && season) {
    searchResults = seasonQuery.categoryQuery;
  } else if (!activityName && !category && destination && season) {
    searchResults = seasonQuery.destinationQuery;
  } else if (activityName && !category && !destination && (!season || season === 'All year round')) {
    searchResults = nameQuery;
  } else if (!activityName && !category && destination && (!season || season === 'All year round')) {
    searchResults = destinationQuery;
  } else if (!activityName && !category && !destination && season) {
    searchResults = seasonQuery;
  } else if (!activityName && category && !destination && (!season || season === 'All year round')) {
    searchResults = categoryQuery;
  }
  const querySnapshot = await searchResults.get();
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
    searchResultsArray.push({id: doc.id, data: doc.data()});
  });
  return searchResultsArray;
}

export const addFavoriteActivitiesToUserTrip = (user, favoriteActivities) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  return userRef.update({
    trip: {
      ...user.trip,
      favoriteactivities: favoriteActivities
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


export const getActivityWithIdDocument = async (id) => {
  if (!id) return null;
  try {
    const activityDocument = await firestore.doc(`activities/${id}`).get();
    return {
      id,
      data: {...activityDocument.data()}
    };
  } catch (error) {
    console.error("Error fetching activity", error);
  }
}

export const addFavoriteActivityToUserTrip = (user, activity) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  return userRef.update({
    trip: {
      ...user.trip,
      favoriteactivities: [...user.trip.favoriteactivities, activity]
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

export const deleteActivityFromUserAcitivities = (user, aid) => {
  const userRef = firestore.doc(`users/${user.uid}`);
  const newList = user.trip.favoriteactivities.filter(activity => activity.id !== aid);

  return userRef.update({
    trip: {
      ...user.trip,
      favoriteactivities: newList
    }
  })
      .then(function() {
        console.log("User document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating user document: ", error);
      });
}

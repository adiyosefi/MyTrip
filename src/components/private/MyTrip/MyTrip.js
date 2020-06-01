import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user";
import './MyTrip.css';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {myTheme} from './../../../themes/myTheme';
import _ from "underscore";
import MyTripUserProfile from "./MyTripUserProfile";
import TripTitle from "./TripTitle";
import TripItineraryForm from "./TripItineraryForm";
import TripFavoriteActivities from "./TripFavoriteActivities";
import TripFavoriteEquipmentList from "./TripFavoriteEquipmentList";
import TripNotes from "./TripNotes";


const MyTrip = () => {
  const {currentUser} = useContext(UserContext);

  const { photoURL, displayName, email } = currentUser;
  const [trip, setTrip] = useState((currentUser && currentUser.trip) ? currentUser.trip : null);

  console.log(trip, currentUser.trip);

  // get trip data from document reference
  useEffect(() => {
    console.log("from myTrip: ", trip)
    if (currentUser.trip) {
      setTrip(currentUser.trip);
    }
  }, [currentUser]);

  return (
      <ThemeProvider theme={myTheme}>
        <div className="mytrip">
          <div className="background">
            <div className="content-container">
              <div className="user-profile-container">
                <MyTripUserProfile photoURL={photoURL} displayName={displayName} email={email}/>
              </div>
              <div className="itinerary-form-or-title-container">
                {!_.isEmpty(trip) ? <TripTitle trip={trip} setTrip={setTrip} user={currentUser} />
                :
                    <TripItineraryForm user={currentUser} trip={trip} setTrip={setTrip} />}
              </div>
              <div className="activities-and-list-container">
                <div className="favourite-activities-container">
                  {!_.isEmpty(trip) && <TripFavoriteActivities user={currentUser} />}
                </div>
                <div className="favourite-equipment-list-container">
                  {!_.isEmpty(trip) && <TripFavoriteEquipmentList user={currentUser} />}
                </div>
              </div>
              <div className="notes-container">
                {!_.isEmpty(trip) && <TripNotes user={currentUser} />}
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
  );
};

export default MyTrip;


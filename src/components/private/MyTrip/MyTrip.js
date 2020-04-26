import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { auth, getTripDocument } from "../../../server/firebase";
import './MyTrip.css';
import moment from 'moment';
import { countries } from './../../../server/countries';
import { generateTripDocument, deleteTripFromUser, deleteTripFromTrips } from './../../../server/firebase'



const TripTitle = ({ trip, setTrip, user }) => {
  if (trip != null){
  const { destination } = trip;

  const s = new Date(trip.start);
  const start = moment(s).format('MMMM Do YYYY');

  const e = new Date(trip.end);
  const end = moment(e).format('MMMM Do YYYY');

  const deleteTripHandler = event => {
    event.preventDefault();
    deleteTripFromUser(user);
    deleteTripFromTrips(trip);
    setTrip(null);
  } 

  return (
    <div>
      <h1>{user.displayName}'s trip to {destination}!</h1>
      <div>
        Trip start: {start}
      </div>
      <div>
        Trip End: {end}
      </div>
      <div>
        <button className="" onClick={event => deleteTripHandler(event)}>Delete this trip</button>
      </div>
    </div>
  );
  }
}

const ItineraryForm = ({user}) => {
  const [destination, setDestination] = useState("");
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "tripDestination") {
          setDestination(value);
      } else if (name === "tripStart") {
          setStart(value);
      } else if (name === "tripEnd") {
          setEnd(value);
      }
  };

  const createTripHandler = async (event, destination, start, end) => {
      event.preventDefault();
      if (user.trip==null || !user.trip) {
        console.log('entered trip is null');
        if (destination && start && end) {
        try {
            await generateTripDocument(user, destination, start, end);
            console.log('trip added');
            window.location.href = '/mytrip';
        }
        catch (error) {
            setError('Error creating trip');
        }
        setDestination("");
        setStart(null);
        setEnd(null);
      } 
      else {
        setError("Error creating trip- not all details entered");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">
        Itinerary Planner
      </div>
      <form>
        <input list="destination-of-trip" className="destination-input"
          onChange={event => onChangeHandler(event)}
          name="tripDestination" id="tripDestination" placeholder="Enter destination (Country)" />
        <datalist id="destination-of-trip" className="destination-datalist">
          <option value="Worldwide" defaultValue></option>
          {countries.map(country => {
            return (
              <option value={country.name} key={country.code}></option>
            );
          })}
        </datalist>
        <div className="start-date">
          <label htmlFor="tripStart"> Start: </label>
          <input id="tripStart" type="date" name="tripStart"
            onChange={event => onChangeHandler(event)}
            className="start-date-input" />
        </div>
        <div className="end-date">
          <label htmlFor="tripEnd"> End: </label>
          <input id="tripEnd" type="date" name="tripEnd"
            onChange={event => onChangeHandler(event)}
            className="end-date-input" />
        </div>
        <div>
          {error}
        </div>
        <button name="form-submit"
          onClick={event => {
            createTripHandler(event, destination, start, end);
          }}
          className="form-button">Start planning your trip</button>
      </form>
    </div>
  );
}

const MyTrip = () => {
  const user = useContext(UserContext);
  const { photoURL, displayName, email } = user;
  const [trip, setTrip] = useState(user.trip);

  // get trip data from document reference
  useEffect(() => {
    if (trip){
    const getTripData = async (trip) => {
      const tripData = await getTripDocument(trip.id);
      console.log(tripData);
      setTrip(tripData);
    }
    getTripData(trip);
  }
  }, []);

  return (
    <div className="mytrip">
      <div className="background">
        <div className="user-profile-container">
          <div>
            <img className="profile-picture"
              src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fblank-profile-picture.png?alt=media&token=cf778c36-c451-48e5-bccb-2fe9923ca724'} />
          </div>
          <div className="">
            <h2 className="">{displayName}</h2>
            <h3 className="">{email}</h3>
          </div>
          <button className="" onClick={() => { auth.signOut() }}>Sign out</button>
        </div>
        <div className="itinerary-form-or-title-container">
          {(trip && trip!=null) ? <TripTitle trip={trip} setTrip={setTrip} user={user} /> : <ItineraryForm user={user}/>}
        </div>
        <div className="favourite-activities-container">
          <div className="activitieslistcontainer">
                    <h4>My Activities</h4>
                    {/*<RenderActivities items={items} setItems={setItems}/>*/}
          </div>
        </div>
        <div className="favourite-equipment-list-container">
          <div className="equipmentlistcontainer">
                    <h4>My Equipment List</h4>
                    {/*<RenderListItems items={items} setItems={setItems}/>*/}
          </div>
        </div>
        <div className="notes-container">
          <div className="notescontainer">
                    <h4>My Notes</h4>
                    {/*<RenderNotes />*/}
          </div>
        </div>
      </div>
    </div>
  )
};

export default MyTrip;


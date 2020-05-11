import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { auth, getTripDocument } from "../../../server/firebase";
import './MyTrip.css';
import moment from 'moment';
import { countries } from './../../../server/countries';
import { generateTripDocument, deleteTripFromUser } from './../../../server/firebase'

// HOOKS
import { useFavoriteEquipmentList } from '../../../hooks/useFavoriteEquipmentList';
import { useNotes } from '../../../hooks/useNotes';

const RenderFavoriteActivities = ({ user }) => {
  const [favoriteActivities, setFavoriteActivities] = useState([]);

  useEffect(() => {
    console.log("from RenderFavoriteActivities: ", user.trip.favoriteactivities)
    if (user.trip.favoriteactivities) {
      setFavoriteActivities(user.trip.favoriteactivities);
    }
  }, []);



  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  const activitiesList = favoriteActivities.map((activity) => {
    return (
      <li key={activity.id} className="activityitem">
        <div className="activitycontent">
          <div className="activity-picture-container">
            <img src={activity.data.picture} className="activity-picture" />
          </div>
          <div className="activity-details">
            <div className="activity-name">
              <Link to={`/activities/${activity.id}`} className="activity-link">
                <h5>{titleCase(activity.data.activityName)}</h5>
              </ Link>
            </div>
            <div className="activity-metadata">
              <div className="activity-metadata-item">
                <span>Destination:</span> {activity.data.destination}
              </div>
              <div className="activity-metadata-item">
                <span>Season:</span> {activity.data.season ? activity.data.season : 'All year round'}
              </div>
              <div className="activity-metadata-item">
                <span>Category:</span> {activity.data.category ? activity.data.category : 'All categories'}
              </div>
            </div>
            <div>
              {activity.data.shortDescription}
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="favoriteactivitiescontainer">
      <h4>My Activities</h4>
      {
        favoriteActivities && (
          <div>
            <ul className="activitieslist">
              {activitiesList}
            </ul>
          </div>
        )
      }
    </div>
  );
}

const RenderFavoriteEquipmentList = ({ user }) => {
  const [items, setItems] = useFavoriteEquipmentList(user);
  const [inputState, setInput] = useState("");

  const toggleChecked = useCallback(id => {
    setItems(items.map(item => ({
      ...item,
      checked: item.id === id ? !item.checked : item.checked
    })));
  }, [setItems, items]);

  const handleEdit = useCallback(id => {
    setItems(items.map(item => ({
      ...item,
      onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
    })));
  }, [setItems, items]);

  const handleRemove = (id) => {
    const newList = items.filter(item => item.id !== id);
    setItems(newList);
  };

  const handleInputChange = (e, id) => {
    if (inputState != "") {
      if (e.which === 13) {
        setItems(items.map(item => ({
          ...item,
          label: item.id === id ? e.target.value : item.label,
          onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
        })));
        setInput("");
      }
    }
  }

  const listItems = items.map((item) => {
    return (
      <li key={item.id} className="equipmentlistitem">
        <div className="equipmentlistitemcontent">
          <div className="pretty p-icon p-round">
            <input type="checkbox" id={`check-item-${item.id}`} onClick={() => toggleChecked(item.id)} />
            <div className="state">
              <i className="icon mdi mdi-check"></i>
              <label></label>
            </div>
          </div>
          <input type="text" value={inputState}
            placeholder={item.label}
            className={item.onEditMode ? 'showEditInput' : 'hideEditInput'}
            onKeyUp={(e) => handleInputChange(e, item.id)}
            onChange={e => setInput(e.target.value)} />
          <label htmlFor={`check-item-${item.id}`} className={`${item.checked ? 'item-line-through' : 'item-none'}
                   ${item.onEditMode ? 'hideP' : 'showP'}`}>{item.label} </label>
          <button className={item.onEditMode ? 'hoverBtn' : 'editbtn'} onClick={
            () => { handleEdit(item.id) }
          }>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          <button className="removebtn" onClick={
            () => { handleRemove(item.id) }
          }>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="favoriteequipmentlistcontainer">
      <h4>My Equipment List</h4>
      {
        items && (
          <div>
            <ul className="equipmentlistlist">
              {listItems}
            </ul>
          </div>
        )
      }
    </div>
  );
}

const RenderNotes = ({ user, setError }) => {
  const [notes, setNotes] = useNotes(user);

  // useEffect(() => {
  //   console.log("from notes: ", notes)
  //   setNotes(notes);
  // }, []);

  // const saveNotesToTrip = async (event, notes) => {
  //   event.preventDefault();
  //   if (notes) {
  //     setNotes(notes);
  //     console.log('notes added to trip successfully');
  //   } else {
  //     setError('notes is not filled');
  //   }
  // };

  const clearNotesInTrip = async (event, notes) => {
    event.preventDefault();
    if (notes) {
      setNotes("");
      console.log('notes cleared in trip successfully-', notes);
    } else {
      setError('notes is not filled');
    }
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "notes") {
      setNotes(value);
    }
  };

  return (
    <div className="notescontainer">
      <h4>My Notes</h4>
      <div className="text">
        <form>
          <textarea id="notepad" name="notes" value={notes}
            placeholder="Start typing ..."
            onChange={event => onChangeHandler(event)}>
          </textarea>
          <button onClick={event => {
            clearNotesInTrip(event, notes);
          }}>Clear notes</button>
        </form>
      </div>
    </div>
  );
}


const TripTitle = ({ trip, setTrip, user }) => {
  if (trip != null) {
    const { destination } = trip;

    const s = new Date(trip.start);
    const start = moment(s).format('MMMM Do YYYY');

    const e = new Date(trip.end);
    const end = moment(e).format('MMMM Do YYYY');

    const deleteTripHandler = event => {
      event.preventDefault();
      setTrip(null);
      deleteTripFromUser(user, trip);
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

const ItineraryForm = ({ user, trip, setTrip }) => {
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
    console.log('entered tripHandler');
    if (trip == null || !trip) {
      console.log('entered trip is null');
      if (destination && start && end) {
        try {
          await generateTripDocument(user, destination, start, end);
          setTrip(user.trip);
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
        <input required list="destination-of-trip" className="destination-input"
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
  const [error, setError] = useState(null);

  // get trip data from document reference
  useEffect(() => {
    console.log("from myTrip: ", trip)
    if (user.trip) {
      setTrip(user.trip);
    }
  }, []);


  return (
    <div className="mytrip">
      <div className="background">
        <div className="user-profile-container">
          <div>
            <img className="profile-picture"
              src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fprofile-pictures%2Fblank-profile-picture.png?alt=media&token=fd112c3c-e460-4e37-997b-36a914682bf9'} />
          </div>
          <div className="">
            <h2 className="">{displayName}</h2>
            <h3 className="">{email}</h3>
          </div>
          <button className="" onClick={() => { auth.signOut() }}>Sign out</button>
        </div>
        <div className="itinerary-form-or-title-container">
          {trip && trip.destination ? <TripTitle trip={trip} setTrip={setTrip} user={user} /> : <ItineraryForm user={user} trip={trip} setTrip={setTrip} />}
        </div>
        <div className="favourite-activities-container">
          <div className="activitieslistcontainer">
            {trip && <RenderFavoriteActivities user={user} />}
          </div>
        </div>
        <div className="favourite-equipment-list-container">
          <div className="equipmentlistcontainer">
            {trip && <RenderFavoriteEquipmentList user={user} />}
          </div>
        </div>
        <div className="notes-container">
          {trip && <RenderNotes user={user} setError={setError} />}
        </div>
      </div>
    </div>
  )
};

export default MyTrip;


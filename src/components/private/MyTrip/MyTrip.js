import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../../context/user";
import { auth } from "../../../server/firebase";
import './MyTrip.css';
import moment from 'moment';
import { countries } from './../../../server/countries';
import { generateTripDocument, deleteTripFromUser, deleteActivityFromUserAcitivities } from './../../../server/firebase'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Loading from './../../global/Loading';

// HOOKS
import { useFavoriteEquipmentList } from '../../../hooks/useFavoriteEquipmentList';
import { useNotes } from '../../../hooks/useNotes';
import _ from "underscore";

const myTheme = createMuiTheme({
  typography: {
      fontFamily: 'Poppins, sans-serif'
  },
  overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
              fontSize: 14,
              "&$focused:not($error)": { // increase the specificity for the pseudo class
                  color: "#9c9c9c"
              },
              '&:hover:not($error)': {
                  color: "#9c9c9c",
              }
          }
      },
      MuiOutlinedInput: {
          root: {
              '& $notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                  borderColor: '#9c9c9c',
                  // Reset on touch devices, it doesn't add specificity
                  '#media (hover: none)': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
              },
              '&$focused $notchedOutline': {
                  borderColor: '#9c9c9c',
                  borderWidth: 1,
              },
          },
      },
  }
});

const RenderFavoriteActivities = ({ user }) => {
  const [favoriteActivities, setFavoriteActivities] = useState([]);

  useEffect(() => {
    console.log("from RenderFavoriteActivities: ", user.trip.favoriteactivities)
    if (user.trip.favoriteactivities) {
      setFavoriteActivities(user.trip.favoriteactivities);
    }
  }, [user.trip.favoriteactivities]);

  const deleteFavoriteActivity = (event, aid) => {
    event.preventDefault();
    const newList = favoriteActivities.filter(activity => activity.id !== aid);
    setFavoriteActivities(newList);
    deleteActivityFromUserAcitivities(user, aid);
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }

  const activitiesList = favoriteActivities.map((activity) => {
    return (
      <li key={activity.id} className="activityitem">
        <div className="container-per-activity">
          <div className="activitycontent">
            <div className="activity-picture-container">
              <img src={activity.data.picture} alt="activity-pic" className="activity-picture" />
            </div>
            <div className="activity-details">
            <div className="activity-delete-and-title">
              <div className="activity-name">
                <Link to={`/activities/${activity.id}`} className="activity-link">
                  <h5>{titleCase(activity.data.activityName)}</h5>
                </ Link>
              </div>
              <div className="activity-delete">
                  <Tooltip title="Remove" arrow>
                    <button className="activity-delete-button" onClick={event => deleteFavoriteActivity(event, activity.id)}>
                      &times;
                </button>
                  </Tooltip>
                </div>
                </div>
              <div className="activity-metadata">
                <div className="activity-metadata-item">
                  <i className="fa fa-plane"></i> <span>Destination:</span> {activity.data.destination}
                </div>
                <div className="metadata-season-category">
                <div className="activity-metadata-item activity-metadata-item-season">
                  <i className="fa fa-cloud"></i> <span>Season:</span> {activity.data.season ? activity.data.season : 'All year round'}
                </div>
                <div className="activity-metadata-item">
                  <i className="fa fa-list-ul"></i> <span>Category:</span> {activity.data.category ? activity.data.category : 'All categories'}
                </div>
                </div>
              </div>
              <div>
                {activity.data.shortDescription}
              </div>
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
        favoriteActivities.length !== 0  && (
          <div className="fav-act-list-con">
            <ul className="activitieslist">
              {activitiesList}
            </ul>
          </div>
        )
      }
      {
        favoriteActivities.length === 0 && (
          <div className="no-activities-content">
            <div>
            No favorite activities yet...
            </div>
            <div className="">
          <Link to="/activities" className="link-to-activities">CLICK HERE</Link> to search and add activities
        </div>
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
    if (inputState !== "") {
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
          <Tooltip title="Edit" arrow>
          <button className={item.onEditMode ? 'hoverBtn' : 'editbtn'} onClick={
            () => { handleEdit(item.id) }
          }>
            <i className="fa fa-pencil" aria-hidden="true"></i>
          </button>
          </Tooltip>
          <Tooltip title="Remove" arrow>
          <button className="removebtn" onClick={
            () => { handleRemove(item.id) }
          }>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
          </Tooltip>
        </div>
      </li>
    );
  });

  return (
    <div className="favoriteequipmentlist">
      <h4>My Equipment List</h4>
      {
        items.length !== 0 && (
          <div className="favoriteequipmentlistcontainer">
            <ul className="equipmentlistlist">
              {listItems}
            </ul>
          </div>
        )
      }
      {
        items.length === 0 && (
          <div className="no-items-content">
            <div className="no-items-title">
            No favorite equipment list yet...
            </div>
            <div className="no-items-link">
          <Link to="/equipmentlistsearch" className="link-to-equipmentlists">CLICK HERE</Link> to search and add an equipment list
        </div>
        <div className="no-items-link">
          <Link to="/privateequipmentlist" className="link-to-equipmentlists">CLICK HERE</Link> to create your own equipment list
        </div>
          </div>
        )
      }
    </div>
  );
}

const RenderNotes = ({ user }) => {
  const [notes, setNotes] = useNotes(user);

  const [notesError, setNotesError] = useState(null);

  const clearNotesInTrip = async (event, notes) => {
    event.preventDefault();
    if (notes) {
      setNotes("");
      console.log('notes cleared in trip successfully-', notes);
    } else {
      setNotesError('Notes is not filled');
    }
  };

  const handleChangeNotes = (event) => {
    setNotes(event.target.value);
};

  return (
    <div className="notescontainer">
      <h4>My Notes</h4>
      <div className="text">
        <form>
          <TextField
          id="notepad"
          name="notes"
          label="Start typing ..."
          multiline
          rows={7}
          style={{ width: 1070 }}
          value={notes}
          variant="outlined"  
          onChange={handleChangeNotes}
        />
        <div className="clear-notes-button-and-error">
          <button className="clear-notes-button" onClick={event => {
            clearNotesInTrip(event, notes);
          }}>Clear notes</button>
          {notesError && 
                            <div className="error-no-notes">
                            <i className="fa fa-large fa-exclamation-circle"></i> {notesError}
                            </div>
                            }
                            </div>
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
      <div className="trip-title-container">
        <h1>{user.displayName}'s trip to {destination}!</h1>
        <div className="trip-metadata">
          <div className="trip-metadata-item">
            <span>Trip start:</span> {start}
          </div>
          <div className="trip-metadata-item">
            <span>Trip end:</span> {end}
          </div>
          <div>
            <button className="delete-trip-button" onClick={event => deleteTripHandler(event)}>Delete this trip</button>
          </div>
        </div>
      </div>
    );
  }
}

const ItineraryForm = ({ user, trip, setTrip }) => {
  const [destination, setDestination] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  
  const [createTripSuccess, setCreateTripSuccess] = useState(null);
  const [createTripError, setCreateTripError] = useState(null);

  const useStyles = makeStyles(theme => ({
    option: {
        fontSize: 14,
    },
    selectRoot: {
        textAlign: "left",
    },
}));

const classes = useStyles();

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
          setCreateTripSuccess('Trip created successfully!')
          window.location.href = '/mytrip';
        }
        catch (createTripError) {
          setCreateTripError('Error creating trip');
        }
        setDestination("");
        setStart("");
        setEnd("");
      }
      else {
        setCreateTripError("Enter all details");
      }
    }
  };

  const handleStartDateChange = (event) => {
    setStart(event.target.value);
    console.log(start);
  };

  const handleEndDateChange = (event) => {
    setEnd(event.target.value);
    console.log(end);
  };


  return (
    <div className="form-container">
      <div className="form-title">
      <h1>Plan your next trip!</h1>
      </div>
      <div className="iti-form-container">
      <form>
      <div className="form-content">
      <div className="destination-input">
      <Autocomplete
                style={{ width: 300 }}
                inputValue={destination}
                onInputChange={(event, newDestination) => {
                  setDestination(newDestination);
                }}
                options={countries}
                classes={{
                  option: classes.option,
                }}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(option) => (
                  <>
                    {option.label}
                  </>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Destination"
                    variant="outlined"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                  />
                )}
              />
        </div>
        <div className="start-date">
        <TextField
    id="tripStart"
    variant="outlined"
    label="Start date"
    type="date"
    value={start}
    onChange={handleStartDateChange}
    InputLabelProps={{
      shrink: true,
    }}
  />          
        </div>
        <div className="end-date">
        <TextField
    id="tripEnd"
    variant="outlined"
    label="End date"
    type="date"
    value={end}
    onChange={handleEndDateChange}
    InputLabelProps={{
      shrink: true,
    }}
  />          
        </div>
        </div>
        <div className="form-btn-error-container">
        <div className="form-btn-container">
        <button name="form-submit"
          onClick={event => {
            createTripHandler(event, destination, start, end);
          }}
          className="form-button">Start planning your trip!</button>
          {createTripSuccess &&
                            <div className="trip-success-message">
                            <i className="fa fa-check-circle"></i> {createTripSuccess}
                            </div>
                            }
                            {createTripError && 
                            <div className="error-no-trip">
                            <i className="fa fa-large fa-exclamation-circle"></i> {createTripError}
                            </div>
                            }
          </div>
          </div>
      </form>
      </div>
    </div>
  );
}

const RenderMyTrip = ({user}) => {
  const { photoURL, displayName, email } = user;
  const [trip, setTrip] = useState((user && user.trip) ? user.trip : null);

  console.log(trip, user.trip);

  // get trip data from document reference
  useEffect(() => {
    console.log("from myTrip: ", trip)
    if (user.trip) {
      setTrip(user.trip);
    }
  }, [user]);

  return (
    <ThemeProvider theme={myTheme}>
    <div className="mytrip">
      <div className="background">
        <div className="content-container">
          <div className="user-profile-container">
            <div className="user-picrute-container">
              <img className="profile-picture" alt="user-profile"
                src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fprofile-pictures%2Fblank-profile-picture.png?alt=media&token=fd112c3c-e460-4e37-997b-36a914682bf9'} />
            </div>
            <div className="user-details-metadata">
              <h2 className="">{displayName}</h2>
              <h3 className="">{email}</h3>
            </div>
            <button className="signout-button" onClick={() => { auth.signOut(); }}>Sign out <i className="fa fa-sign-out"></i></button>
          </div>
          <div className="itinerary-form-or-title-container">
            {!_.isEmpty(trip) ? <TripTitle trip={trip} setTrip={setTrip} user={user} /> : <ItineraryForm user={user} trip={trip} setTrip={setTrip} />}
          </div>
          <div className="activities-and-list-container">
          <div className="favourite-activities-container">
              {!_.isEmpty(trip) && <RenderFavoriteActivities user={user} />}
          </div>
          <div className="favourite-equipment-list-container">
              {!_.isEmpty(trip) && <RenderFavoriteEquipmentList user={user} />}
          </div>
          </div>
          <div className="notes-container">
            {!_.isEmpty(trip) && <RenderNotes user={user} />}
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}


const MyTrip = () => {
  const {currentUser} = useContext(UserContext);

  return (
    <RenderMyTrip user={currentUser} />
  )
};

export default MyTrip;


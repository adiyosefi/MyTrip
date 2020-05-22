import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import { countries } from './../../../server/countries';
import { UserContext } from './../../../context/user';
import { generateTripDocument } from './../../../server/firebase'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';

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
  

const Home = () => {
    const user = useContext(UserContext);

    console.log(user);

    const [destination, setDestination] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [createTripSuccess, setCreateTripSuccess] = useState(null);
    const [createTripError, setCreateTripError] = useState(null);

    const [trip, setTrip] = useState((user && user.trip) ? user.trip : null);
    console.log(trip);

    const useStyles = makeStyles(theme => ({
        option: {
            fontSize: 14,
        },
        selectRoot: {
            textAlign: "left",
        },
    }));
    
    const classes = useStyles();

      // get trip data from document reference
  useEffect(() => {
    let mounted = true;
    if(mounted){
    if (user && user.trip) {
        setTrip(user.trip);
        console.log(trip);
    }
    }
    return () => mounted = false;  
  }, [user]);


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
    

    const createTripHandler = async (event, destination, start, end, trip, setTrip) => {
        event.preventDefault();
        if(user){
        if (trip == null || !trip) {
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
                setCreateTripError('Enter all details');
                console.log('Error creating trip');
            }
        }
        else {
            setCreateTripError('You already have a trip!');
            window.location.href = '/mytrip';
        } 
    }
    else {
        setCreateTripError('Signin first!');
        window.location.href = '/signinup';
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
        <ThemeProvider theme={myTheme}>
        <div className="home">
            <div className="background">
                <div className="container">
                    <div className="title">
                        <h2 className="mytrip-title">Plan the trip
                            of your dreams</h2>
                        <p>MyTrip is the new way to plan your next trip!</p>
                    </div>
                    <div className="form-container">
                        <div className="form-title">
                            Itinerary Planner
                        </div>
                        <form>
                        <div className="destination-input">
      <Autocomplete
                style={{ width: 250 }}
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
    style={{ width: 190 }}
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
    style={{ width: 190 }}
    value={end}
    onChange={handleEndDateChange}
    InputLabelProps={{
      shrink: true,
    }}
  />       
                            </div>
                            <div className="form-btn-error-container">
                            <button name="form-submit"
                                onClick={event => {
                                    createTripHandler(event, destination, start, end, trip, setTrip);
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
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </ThemeProvider>
    );
};

export default Home;
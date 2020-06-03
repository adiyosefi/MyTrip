import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { countries } from './../../../server/countries';
import { UserContext } from './../../../context/user';
import { generateTripDocument } from './../../../server/firebase'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import _ from 'underscore';
import {myTheme} from './../../../themes/myTheme';


const Home = () => {
    const {currentUser} = useContext(UserContext);

    const [destination, setDestination] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const [createTripSuccess, setCreateTripSuccess] = useState(null);
    const [createTripError, setCreateTripError] = useState(null);

    const trip = (currentUser && currentUser.trip) ? currentUser.trip : null;


    const useStyles = makeStyles(theme => ({
        option: {
            fontSize: 14,
        },
        selectRoot: {
            textAlign: "left",
        },
    }));

    const classes = useStyles();

    const createTripHandler = async (event, destination, start, end, trip) => {
        event.preventDefault();
        if(!_.isEmpty(currentUser)){
            if (trip == null || !trip) {
                if (destination && start && end) {
                    try {
                        await generateTripDocument(currentUser, destination, start, end);
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
                                                createTripHandler(event, destination, start, end, trip);
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
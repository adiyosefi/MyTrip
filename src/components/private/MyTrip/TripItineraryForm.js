import React, {useState} from 'react';
import './MyTrip.css';
import {makeStyles} from "@material-ui/core/styles";
import {generateTripDocument} from "../../../server/firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {countries} from "../../../server/countries";
import TextField from "@material-ui/core/TextField";

const TripItineraryForm = ({ user, trip }) => {
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
        if (trip == null || !trip) {
            if (destination && start && end) {
                try {
                    await generateTripDocument(user, destination, start, end);
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
    };

    const handleEndDateChange = (event) => {
        setEnd(event.target.value);
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
                                style={{ width: 275 }}
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
};

export default TripItineraryForm;
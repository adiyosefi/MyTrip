import React from 'react';
import './MyTrip.css';
import moment from "moment";
import {deleteTripFromUser} from "../../../server/firebase";

const TripTitle = ({ trip, user }) => {
    if (trip != null) {
        const { destination } = trip;

        const s = new Date(trip.start);
        const start = moment(s).format('MMMM Do YYYY');

        const e = new Date(trip.end);
        const end = moment(e).format('MMMM Do YYYY');

        const deleteTripHandler = event => {
            event.preventDefault();
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
};

export default TripTitle;
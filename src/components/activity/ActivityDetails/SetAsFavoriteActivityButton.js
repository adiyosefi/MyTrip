import React, {useState} from 'react';
import {addFavoriteActivityToUserTrip} from "../../../server/firebase";
import './ActivityDetails.css';
import _ from 'underscore';

const SetAsFavoriteActivityButton = ({currentUser, activity}) => {
    const [favActivityError, setFavActivityError] = useState(null);
    const [favActivitySuccess, setFavActivitySuccess] = useState(null);

    const handleAddToFavoriteActivities = async (event, user, activity) => {
        event.preventDefault();
        if (user.trip !== null || !_.isEmpty(user.trip)) {
            if (!user.trip.favoriteactivities ||
                user.trip.favoriteactivities.length === 0 ||
                (user.trip.favoriteactivities && user.trip.favoriteactivities.length !==0
                    && _.where(user.trip.favoriteactivities, {id: activity.id}).length === 0)) {
                try {
                    await addFavoriteActivityToUserTrip(user, activity);
                    setFavActivitySuccess('Activity added to your trip successfully!');
                    window.location.href = '/mytrip';
                } catch (favActivityError) {
                    setFavActivityError('Error saving favorite activity');
                }
            } else {
                setFavActivityError('This activity has already been inserted!');
            }
        } else {
            setFavActivityError('Create trip first!');
            window.location.href = '/mytrip';
        }
    }

    return (
        <div className="submit-fav-act-button-container">
            <button className="submit-fav-act-button"
                    onClick={e => handleAddToFavoriteActivities(e, currentUser, activity)}>
                Set as my favorite activity
            </button>
            {favActivitySuccess &&
            <div className="activity-success-message">
                <i className="fa fa-check-circle"></i> {favActivitySuccess}
            </div>
            }
            {favActivityError &&
            <div className="activity-error-message">
                <i className="fa fa-exclamation-circle"></i> {favActivityError}
            </div>
            }
        </div>
    );
};

export default SetAsFavoriteActivityButton;
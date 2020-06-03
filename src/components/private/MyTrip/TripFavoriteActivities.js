import React, {useEffect, useState} from 'react';
import './MyTrip.css';
import {deleteActivityFromUserAcitivities} from "../../../server/firebase";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";

const TripFavoriteActivities = ({ user }) => {
    const [favoriteActivities, setFavoriteActivities] = useState([]);

    useEffect(() => {
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
};

export default TripFavoriteActivities;
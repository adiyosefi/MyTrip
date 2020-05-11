import React, { useEffect, useState, useContext } from 'react';
import './ActivityDetails.css';
import { Link } from 'react-router-dom';
import { getActivityWithIdDocument } from './../../../server/firebase'
import Loading from '../../global/Loading';
import {addFavoriteActivityToUserTrip} from './../../../server/firebase'
import { UserContext } from './../../../context/user';

const ActivityDetails = ({ match }) => {

    const user = useContext(UserContext);
    const [activity, setActivity] = useState(null);
    const [favActivityError, setFavActivityError] = useState(null);
    const [favActivitySuccess, setFavActivitySuccess] = useState(null);

    var tempActivity;

    useEffect(() => {
        async function fetchData() {
            try {
                tempActivity = await getActivityWithIdDocument(match.params.activityId);
                console.log(tempActivity);
                setActivity(tempActivity);
            }
            catch (error) {
                console.log('Error getting public activities');
            }
        }
        fetchData();
    }, []);


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const handleAddToFavoriteActivities = async (event, user, activity) => {
        event.preventDefault();
        console.log('entered handleAddToFavoriteActivities');
        if (user.trip != null || user.trip) {
            console.log('entered trip is not null');
            if (activity) {
                try {
                    await addFavoriteActivityToUserTrip(user, activity);
                    console.log('trip updated');
                    setFavActivitySuccess('Activity added to your trip successfully!');
                    window.location.href = '/mytrip';
                }
                catch (favActivityError) {
                    setFavActivityError('Error saving favorite activity');
                }
            } else {
                setFavActivityError('Select activities first!');
                console.log("error need to choose activiries first-", favActivityError);
            }
        } else {
            setFavActivityError('Create trip first!');
            console.log("error need to create trip first-", favActivityError);
            window.location.href = '/mytrip';
        }
    }

    if (activity) {
        return (
            <div className="activitydetails">
                <div className={`background-${activity.data.type}`}>
                    <div className="container">
                        <div className="title">
                            <h1>{titleCase(activity.data.activityName)}</h1>
                        </div>
                    </div>
                </div>
                <div className="contentcontainer">
                    <div className="activity-metadata">
                        <div className="activity-metadata-item">
                            <i className="fa fa-large fa-plane"></i> <span>Destination:</span> {activity.data.destination}
                        </div>
                        <div className="activity-metadata-item">
                        <i className="fa fa-large fa-cloud"></i> <span>Season:</span> {activity.data.season ? activity.data.season : 'All year round'}
                        </div>
                        <div className="activity-metadata-item">
                        <i className="fa fa-large fa-list-ul"></i> <span>Category:</span> {activity.data.category ? activity.data.category : 'All categories'}
                        </div>
                        {user && 
                        <div className="submit-fav-act-button-container">
                        <button className="submit-fav-act-button"
                        onClick={e => handleAddToFavoriteActivities(e, user, activity)}>
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
                        </div>}
                    </div>
                    { (activity.data.type == 'Hiking-Trail') &&
                        <div className="activity-hiking-metadata">
                            <div className="activity-hiking-metadata-item">
                            <span>Activity type:</span> {activity.data.type}
                            </div>
                            <div className="activity-hiking-metadata-item">
                            <span>Route:</span> {activity.data.route}
                            </div>
                            <div className="activity-hiking-metadata-item">
                            <span>Difficulty:</span> {activity.data.difficulty}
                            </div>
                            <div className="activity-hiking-metadata-item">
                            <span>Extension:</span> {activity.data.extension}
                            </div>
                            <div className="activity-hiking-metadata-item">
                            <span>Time average:</span> {activity.data.timeAverage}
                            </div>
                        </div>
                    }
                    { (activity.data.type == 'Restaurant') &&
                    <div>
                        <div className="activity-restaurant-metadata">
                            <div className="activity-restaurant-metadata-item">
                            <span>Activity type:</span> {activity.data.type}
                            </div>
                            <div className="activity-restaurant-metadata-item">
                            <span>Cuisines:</span> {activity.data.cuisines}
                            </div>
                            <div className="activity-restaurant-metadata-item">
                            <span>Price Range:</span> {activity.data.priceRange}
                            </div>
                        </div>
                        <div className="activity-restaurant-metadata-contact">
                        <div className="activity-restaurant-metadata-item">
                        <span>Phone:</span> {activity.data.phone}
                        </div>
                        <div className="activity-restaurant-metadata-item">
                        <a href={activity.data.website} target='_blank'><span>Website </span><i className="fa fa-large fa-external-link"></i></a>
                        </div>
                        </div>
                    </div>
                    }
                    { (activity.data.type == 'Attraction') &&
                    <div>
                        <div className="activity-attraction-metadata">
                            <div className="activity-attraction-metadata-item">
                            <span>Activity type:</span> {activity.data.type}
                            </div>
                            <div className="activity-attraction-metadata-item">
                            <span>Suggested duration:</span> {activity.data.suggestedDuration}
                            </div>
                        <div className="activity-attraction-metadata-item">
                        <span>Phone:</span> {activity.data.phone}
                        </div>
                        <div className="activity-attraction-metadata-item">
                        <a href={activity.data.website} target='_blank'><span>Website </span><i className="fa fa-large fa-external-link"></i></a>
                        </div>
                        </div>
                    </div>
                    }
                    <div className="activity-address-description-picture">
                        <div className="activity-address-description">
                    <div className="activity-address">
                    <i className="fa fa-large fa-map-marker"></i> <span>Address:</span> {activity.data.address ? activity.data.address : 'No address'}
                    </div>
                    <div className="activity-description">
                        <div className="description-title"><span>Description:</span></div>
                        <div className="activity-description-content">{activity.data.longDescription ? activity.data.longDescription : 'No description'}</div>
                    </div>
                    </div>
                    <div className="activity-picture-container">
                        <img src={activity.data.picture} className="activity-picture"/>
                    </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <Loading />
        );
    }
};

export default ActivityDetails;
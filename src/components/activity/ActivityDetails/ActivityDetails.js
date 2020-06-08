import React, { useEffect, useState, useContext } from 'react';
import './ActivityDetails.css';
import { getActivityWithIdDocument } from './../../../server/firebase'
import Loading from '../../global/Loading';
import {addFavoriteActivityToUserTrip} from './../../../server/firebase'
import { UserContext } from './../../../context/user';
import _ from 'underscore';
import HikingTrailDetails from "./HikingTrailDetails";
import RestaurantDetails from "./RestaurantDetails";
import AttractionDetails from "./AttractionDetails";
import SetAsFavoriteActivityButton from "./SetAsFavoriteActivityButton";


const ActivityDetails = ({ match }) => {

    const {currentUser} = useContext(UserContext);
    const [activity, setActivity] = useState(null);

    let tempActivity;

    useEffect(() => {
        async function fetchData() {
            try {
                tempActivity = await getActivityWithIdDocument(match.params.activityId);
                if (_.isEmpty(tempActivity.data)) {
                    setActivity(null);
                    window.location.href = '/activities';
                } else {
                    setActivity(tempActivity);
                }
            }
            catch (error) {
                console.log('Error getting public activities', error);
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
                            <span><i className="fa fa-large fa-plane"></i> <span className="underline-title">Destination:</span></span> <span>{activity.data.destination}</span>
                        </div>
                        <div className="activity-metadata-item">
                            <span><i className="fa fa-large fa-cloud"></i> <span className="underline-title">Season:</span></span> <span>{activity.data.season ? activity.data.season : 'All year round'}</span>
                        </div>
                        <div className="activity-metadata-item">
                            <span><i className="fa fa-large fa-list-ul"></i> <span className="underline-title">Category:</span></span> <span>{activity.data.category ? activity.data.category : 'All categories'}</span>
                        </div>
                        {!_.isEmpty(currentUser) &&
                            <SetAsFavoriteActivityButton currentUser={currentUser} activity={activity} />
                        }
                    </div>
                    { (activity.data.type === 'Hiking-Trail') &&
                        <HikingTrailDetails activity={activity}/>
                    }
                    { (activity.data.type === 'Restaurant') &&
                        <RestaurantDetails activity={activity}/>
                    }
                    { (activity.data.type === 'Attraction') &&
                        <AttractionDetails activity={activity}/>
                    }
                    <div className="activity-address-description-picture">
                        <div className="activity-address-description">
                            <div className="activity-address">
                                <i className="fa fa-large fa-map-marker"></i> <span className="underline-title">Address:</span> {activity.data.address ? activity.data.address : 'No address'}
                            </div>
                            <div className="activity-description">
                                <div className="description-title"><span className="underline-title">Description:</span></div>
                                <div className="activity-description-content">{activity.data.longDescription ? activity.data.longDescription : 'No description'}</div>
                            </div>
                        </div>
                        <div className="activity-picture-container">
                            <img src={activity.data.picture} alt="activity-pic" className="activity-picture"/>
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
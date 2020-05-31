import React, {useCallback, useState} from 'react';
import './ActivitySearch.css';
import {addFavoriteActivitiesToUserTrip} from "../../../server/firebase";
import _ from "underscore";
import {Link} from "react-router-dom";
import SetAsFavoriteActivityButtonSearch from "./SetAsFavoriteActivityButtonSearch";
import {Pagination} from "@material-ui/lab";


const ActivitiesResults = ({ activities, setActivities, user }) => {
    console.log("activities-", activities);

    const [currentPage, setCurrentPage] = useState(1);

    const [favActivityError, setFavActivityError] = useState(null);

    const [favActivitySuccess, setFavActivitySuccess] = useState(null);


    const numberOfActivitiesPerPage = 10;

    const numberOfPages = Math.ceil(activities.length / numberOfActivitiesPerPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastActivity = currentPage * numberOfActivitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - numberOfActivitiesPerPage;
    const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);

    const handleAddToFavoriteActivities = async (event, user, activities) => {
        event.preventDefault();
        console.log('entered handleAddToFavoriteActivities');
        var newAFavActArray;
        const filterActivities = activities.filter((activity) => {
            return activity.checked === true;
        });
        console.log('filter activities', filterActivities);
        if (user.trip !== null || user.trip) {
            console.log('entered trip is not null');
            if (filterActivities.length) {
                if (user.trip.favoriteactivities) {
                    newAFavActArray = user.trip.favoriteactivities.concat(filterActivities);
                } else {
                    newAFavActArray = filterActivities;
                }
                try {
                    await addFavoriteActivitiesToUserTrip(user, newAFavActArray);
                    console.log('trip updated');
                    setFavActivitySuccess('Activities added to your trip successfully!');
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

    const toggleChecked = useCallback(id => {
        setActivities(activities.map(activity => ({
            ...activity,
            checked: activity.id === id ? !activity.checked : activity.checked
        })));
        //updateUserAddNewItems(user, items);
    }, [setActivities, activities]);

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    const activitiesItems = currentActivities.map((activity) => {
        return (
            <li key={activity.id}>
                <label htmlFor={`check-item-${activity.id}`} className={`${activity.checked ? 'activity-checked' : 'activity-none'}`}>
                    <div className={`${activity.checked ? 'activity-container-checked' : 'container-per-activity'}`}>
                        <div className="activitycontent">
                            <div className="checkbox-container">
                                {!_.isEmpty(user) &&
                                <div className="pretty p-icon p-round">
                                    <input type="checkbox" id={`check-item-${activity.id}`} onClick={() => toggleChecked(activity.id)} />
                                    <div className="state">
                                        <i className="icon mdi mdi-check"></i>
                                        <label></label>
                                    </div>
                                </div>}
                            </div>
                            <div className="activity-picture-container">
                                <img src={activity.data.picture} alt="activity-pic" className="activity-picture" />
                            </div>
                            <div className="activity-details">
                                <div className="activity-name">
                                    <Link to={`/activities/${activity.id}`} className="activity-link">
                                        <h5>{titleCase(activity.data.activityName)}</h5>
                                    </ Link>
                                </div>
                                <div className="activity-metadata">
                                    <div className="activity-metadata-item">
                                        <i className="fa fa-plane"></i> <span>Destination:</span> {activity.data.destination}
                                    </div>
                                    <div className="activity-metadata-item">
                                        <i className="fa fa-cloud"></i> <span>Season:</span> {activity.data.season ? activity.data.season : 'All year round'}
                                    </div>
                                    <div className="activity-metadata-item">
                                        <i className="fa fa-list-ul"></i> <span>Category:</span> {activity.data.category ? activity.data.category : 'All categories'}
                                    </div>
                                </div>
                                <div>
                                    {activity.data.shortDescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </label>
            </li>
        );
    });

    return (
        <div className="activities-results-container">
            <div className="results-before-pagination">
                <form onSubmit={e => handleAddToFavoriteActivities(e, user, activities)}>
                    <ul className="activitieslistslist">
                        {currentActivities.length !== 0 ?
                            activitiesItems
                            :
                            <div>
                                No results
                            </div>
                        }
                    </ul>
                    <div className="set-fav-act-button-con">
                        {currentActivities.length !== 0 && !_.isEmpty(user) &&
                        <SetAsFavoriteActivityButtonSearch currentUser={user}
                                                           favActivitySuccess={favActivitySuccess}
                                                           favActivityError={favActivityError} />
                        }
                    </div>
                </form>
            </div>
            <div>
                <Pagination className="MuiPagination-root" count={numberOfPages} onChange={handleChange} page={currentPage}
                            showFirstButton showLastButton />
            </div>
        </div>
    );
};

export default ActivitiesResults;
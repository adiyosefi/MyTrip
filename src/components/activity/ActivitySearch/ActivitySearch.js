import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ActivitySearch.css';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from './../../../context/user';
import { countries } from './../../../server/countries';
import { searchActivitiesDocuments, addFavoriteActivitiesToUserTrip } from './../../../server/firebase';
import { Pagination } from '@material-ui/lab';


// HOOKS

const RenderActivities = ({ activities, setActivities, user }) => {
    console.log("activities-", activities);

   
    const [favoriteActivities, setFavoriteActivities] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [error, setError] = useState(null);

    const numberOfActivitiesPerPage = 10;

    const numberOfPages = Math.ceil(activities.length / numberOfActivitiesPerPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastActivity = currentPage * numberOfActivitiesPerPage;
    const indexOfFirstActivity = indexOfLastActivity - numberOfActivitiesPerPage;
    const currentActivities = activities.slice(indexOfFirstActivity, indexOfLastActivity);

    const renderSeason = (season) => {
        return (
            <div>
                Season: {season}
            </div>
        );
    }

    const renderCategory = (category) => {
        return (
            <div>
                Category: {category}
            </div>
        );
    }

    const renderPicture = (picture) => {
        return (
            <div>
                <img src={picture} />
            </div>
        );
    }

    const handleAddToFavoriteActivities = async (event, user, activities) => {
        event.preventDefault();
        console.log('entered handleAddToFavoriteActivities');
        const filterActivities = activities.filter((activity) => {
            return activity.checked == true;
        });
        console.log('filter activities', filterActivities);
        if (user.trip != null || user.trip) {
            console.log('entered trip is not null');
            if (filterActivities.length) {
                try {
                    await addFavoriteActivitiesToUserTrip(user, filterActivities);
                    console.log('trip updated');
                    window.location.href = '/mytrip';
                }
                catch (error) {
                    setError('Error creating trip');
                }
            } else {
                setError('Select activities first!');
                console.log("error need to choose activiries first-", error);
            }
        } else {
            setError('Create trip first!');
            console.log("error need to create trip first-", error);
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
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string
        return splitStr.join(' '); 
     }
     

    const activitiesItems = currentActivities.map((activity) => {

        return (
            <li key={activity.id}>
                <label htmlFor={`check-item-${activity.id}`} className={`${activity.checked ? 'activity-checked' : 'activity-none'}`}>
                    <div className="activitycontent">
                        {user &&
                            <div className="pretty p-icon p-round">
                                <input type="checkbox" id={`check-item-${activity.id}`} onClick={() => toggleChecked(activity.id)} />
                                <div className="state">
                                    <i className="icon mdi mdi-check"></i>
                                    <label></label>
                                </div>
                            </div>}
                        {activity.data.picture && renderPicture(activity.data.picture)}
                        <h5>{titleCase(activity.data.activityName)}</h5>
                        <div>
                            Destination: {activity.data.destination}
                        </div>
                        {activity.data.season && renderSeason(activity.data.season)}
                        {activity.data.category && renderCategory(activity.data.category)}
                        <div>
                            {activity.data.description}
                        </div>
                    </div>
                </label>
            </li>
        );
    });

    return (
        <div>
            <form onSubmit={e => handleAddToFavoriteActivities(e, user, activities)}>
                <ul className="equipmentlistslist">
                    {activitiesItems}
                </ul>
                {user && <button type="submit">
                    Set as my favorite activities</button>}
            </form>
            <Pagination className="MuiPagination-root" count={numberOfPages} onChange={handleChange} page={currentPage}
                showFirstButton showLastButton />
        </div>
    );
}


const ActivitySearch = () => {
    const user = useContext(UserContext);

    const [activityName, setActivityName] = useState("");
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const [activitiesResults, setActivitiesResults] = useState("");
    var activitiesSearchResults;

    // get default search results- all database
    useEffect(() => {
        async function fetchData() {
            try {
                activitiesSearchResults = await searchActivitiesDocuments(activityName, destination, season, category);
                setActivitiesResults(activitiesSearchResults);
            }
            catch (error) {
                setError('Error searching public equipment lists');
            }
        }
        fetchData();
    }, []);


    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "activityName") {
            setActivityName(value);
        } else if (name === "tripDestination") {
            setDestination(value);
        } else if (name === "season") {
            setSeason(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const searchActivitiesDB = async (event, activityName, destination, season, category, setActivitiesResults) => {
        event.preventDefault();
        try {
            activitiesSearchResults = await searchActivitiesDocuments(activityName, destination, season, category);
            setActivitiesResults(activitiesSearchResults);
        }
        catch (error) {
            setError('Error searching activities');
        }

        setActivityName("");
        setDestination("");
        setSeason("");
        setCategory("");
    };

    return (
        <div className="activitysearch">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Search Activity
                    </div>
                    <div className="formcontainer">
                        <form className="el-search-form"
                            onSubmit={event => {
                                searchActivitiesDB(event, activityName, destination, season, category, setActivitiesResults);
                            }}>
                            <div className="search-line">
                                <div class="name-search">
                                    <label htmlFor="activityName"> Search by name: </label>
                                    <input type="text" name="activityName" id="activityName" 
                                    onChange={event => onChangeHandler(event)}
                                    placeholder="Activity name..." />
                                </div>
                                <input list="destination-of-trip" className="destination-input"
                                    onChange={event => onChangeHandler(event)}
                                    name="tripDestination" id="tripDestination"
                                    placeholder="Enter destination (Country)" />
                                <datalist id="destination-of-trip" className="destination-datalist">
                                    <option value="Worldwide" defaultValue></option>
                                    {countries.map(country => {
                                        return (
                                            <option value={country.name} key={country.code}></option>
                                        );
                                    })}
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="season" className=""> Season: </label>
                                <select id="season" name="season"
                                    onChange={event => onChangeHandler(event)}>
                                    <option value="All Year Round" defaultValue>All Year Round</option>
                                    <option value="Summer">Summer</option>
                                    <option value="Winter">Winter</option>
                                    <option value="Fall">Fall</option>
                                    <option value="Spring">Spring</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="category" className=""> Category: </label>
                                <select id="category" name="category"
                                    onChange={event => onChangeHandler(event)}>
                                    <option value="All Categories" defaultValue>All Categories</option>
                                    <option value="Adventure trip">Adventure trip</option>
                                    <option value="City trip">City trip</option>
                                    <option value="Relaxing vacation">Relaxing Vacation</option>
                                </select>
                            </div>
                            <div>
                                {error}
                            </div>
                            <div>
                                <button
                                    className=""
                                    type="submit">
                                    Search</button>
                            </div>
                        </form>
                        <div className="goto-ownactivity">
                            Have your own activity? Add it <Link className="goto-ownactivity-link" to="/privateactivity"> Here </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="listcontainer">
                    <h4>Search Results</h4>
                    {activitiesResults && <RenderActivities activities={activitiesResults} setActivities={setActivitiesResults} user={user} />}
                </div>
            </div>
        </div>
    );
};

export default ActivitySearch;
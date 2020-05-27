import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './ActivitySearch.css';
import { UserContext } from './../../../context/user';
import { countries } from './../../../server/countries';
import { searchActivitiesDocuments, addFavoriteActivitiesToUserTrip } from './../../../server/firebase';
import { Pagination } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Loading from './../../global/Loading';
import _ from 'underscore';


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

const RenderActivities = ({ activities, setActivities, user }) => {
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
        const filterActivities = activities.filter((activity) => {
            return activity.checked === true;
        });
        console.log('filter activities', filterActivities);
        if (user.trip !== null || user.trip) {
            console.log('entered trip is not null');
            if (filterActivities.length) {
                try {
                    await addFavoriteActivitiesToUserTrip(user, filterActivities);
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
                        {currentActivities.length !== 0 ? activitiesItems :
                        <div>
                            No results
                        </div>
                            }
                    </ul>
                    <div className="set-fav-act-button-con">
                        {currentActivities.length !== 0 && !_.isEmpty(user) && <div className="submit-fav-act-button-container">
                            <button className="submit-fav-act-button" type="submit">
                            Set as my favorite activities
                            </button>
                            {favActivitySuccess &&
                            <div className="activity-success-message">
                            <i className="fa fa-check-circle"></i> {favActivitySuccess}
                            </div>
                            }
                            {favActivityError && 
                            <div className="error-no-activities">
                            <i className="fa fa-large fa-exclamation-circle"></i> {favActivityError}
                            </div>
                            }
                            </div>
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
}


const ActivitySearch = () => {
    const {currentUser} = useContext(UserContext);

    const [activityName, setActivityName] = useState("");
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [searchError, setSearchError] = useState(null);

    const [activitiesResults, setActivitiesResults] = useState("");
    var activitiesSearchResults;


    const useStyles = makeStyles(theme => ({
        option: {
            fontSize: 14,
        },
        selectRoot: {
            textAlign: "left",
        },
    }));

    const classes = useStyles();

    // get default search results- all database
    useEffect(() => {
        async function fetchData() {
            try {
                activitiesSearchResults = await searchActivitiesDocuments(activityName, destination, season, category);
                setActivitiesResults(activitiesSearchResults);
            }
            catch (searchError) {
                setSearchError('Error searching public equipment lists');
            }
        }

        fetchData();

    }, []);


    const handleChangeName = (event) => {
        setActivityName(event.target.value);
    };

    const handleChangeSeason = (event) => {
        setSeason(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };


    const searchActivitiesDB = async (event, activityName, destination, season, category, setActivitiesResults) => {
        event.preventDefault();
        try {
            activitiesSearchResults = await searchActivitiesDocuments(activityName, destination, season, category);
            setActivitiesResults(activitiesSearchResults);
        }
        catch (searchError) {
            setSearchError('Error searching activities');
        }

        setActivityName("");
        setDestination("");
        setSeason("");
        setCategory("");
    };

    return (
        <ThemeProvider theme={myTheme}>
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
                                <div className="name-search">
                                    <TextField id="activityName"
                                        style={{ width: 300 }}
                                        label="Activity name..."
                                        variant="outlined"
                                        onChange={handleChangeName}
                                        InputProps={{
                                            classes: {
                                                root: classes.selectRoot,
                                            }
                                        }}
                                    />
                                </div>
                                <div className="select-inputs">
                                    <div className="destination-input">
                                        <Autocomplete
                                            style={{ width: 300 }}
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
                                                        classes: {
                                                            root: classes.outlinedRoot
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className="season-input">
                                        <TextField
                                            id="outlined-select-season"
                                            select
                                            label="Season"
                                            value={season}
                                            style={{ width: 180 }}
                                            onChange={handleChangeSeason}
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    root: classes.selectRoot,
                                                }
                                            }}
                                        >
                                            <MenuItem value=''>
                                                All Year Round
                            </MenuItem>
                                            <MenuItem value='Summer'>
                                                Summer
                            </MenuItem>
                                            <MenuItem value='Winter'>
                                                Winter
                            </MenuItem>
                                            <MenuItem value='Fall'>
                                                Fall
                            </MenuItem>
                                            <MenuItem value='Spring'>
                                                Spring
                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="category-input">
                                        <TextField
                                            id="outlined-select-category"
                                            select
                                            label="Category"
                                            value={category}
                                            style={{ width: 180, paddingTop: 0 }}
                                            onChange={handleChangeCategory}
                                            variant="outlined"
                                            InputProps={{
                                                classes: {
                                                    root: classes.selectRoot,
                                                }
                                            }}
                                        >
                                            <MenuItem value=''>
                                                All Categories
                            </MenuItem>
                                            <MenuItem value='Adventure trip'>
                                                Adventure trip
                            </MenuItem>
                                            <MenuItem value='City trip'>
                                                City trip
                            </MenuItem>
                                            <MenuItem value='Relaxing vacation'>
                                                Relaxing vacation
                            </MenuItem>
                                        </TextField>
                                    </div>
                                    <div>
                                        {searchError}
                                    </div>
                                    <div>
                                        <button
                                            className="activity-search-button"
                                            type="submit">
                                            Search</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="contentcontainer">
                    <div className="listcontainer">
                        <div className="results-title">
                            <h4>Search Results</h4>
                        </div>
                        {activitiesResults ?
                            <RenderActivities activities={activitiesResults} setActivities={setActivitiesResults} user={currentUser} />
                            :
                            <Loading />}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ActivitySearch;
import React, { useCallback, useEffect, useState, useContext } from 'react';
import './ActivitySearch.css';
import { UserContext } from './../../../context/user';
import { searchActivitiesDocuments, addFavoriteActivitiesToUserTrip } from './../../../server/firebase';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Loading from './../../global/Loading';
import {myTheme} from './../../../themes/myTheme';
import SearchActivityForm from "./SearchActivityForm";
import ActivitiesResults from "./ActivitiesResults";

const ActivitySearch = () => {
    const {currentUser} = useContext(UserContext);

    const [activityName, setActivityName] = useState("");
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [searchError, setSearchError] = useState(null);

    const [activitiesResults, setActivitiesResults] = useState("");
    let activitiesSearchResults;

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

    return (
        <ThemeProvider theme={myTheme}>
            <div className="activitysearch">
                <div className="background">
                    <div className="container">
                        <div className="title">
                            Search Activity
                        </div>
                        <div className="formcontainer">
                            <SearchActivityForm activityName={activityName}
                                                setActivityName={setActivityName}
                                                destination={destination}
                                                setDestination={setDestination}
                                                season={season} category={category}
                                                setSeason={setSeason} setCategory={setCategory}
                                                searchError={searchError} setSearchError={setSearchError}
                                                setActivitiesResults={setActivitiesResults}
                                                activitiesSearchResults={activitiesSearchResults} />
                        </div>
                    </div>
                </div>
                <div className="contentcontainer">
                    <div className="listcontainer">
                        <div className="results-title">
                            <h4>Search Results</h4>
                        </div>
                        {activitiesResults ?
                            <ActivitiesResults activities={activitiesResults} setActivities={setActivitiesResults}
                                              user={currentUser} />
                            :
                            <Loading />}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default ActivitySearch;
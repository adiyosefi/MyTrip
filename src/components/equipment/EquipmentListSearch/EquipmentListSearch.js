import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './EquipmentListSearch.css';
import { searchPublicEquipmentListDocuments } from './../../../server/firebase';
import { UserContext } from './../../../context/user';
import { countries } from './../../../server/countries';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Loading from './../../global/Loading';
import {myTheme} from './../../../themes/myTheme';
import EquipmentListsSearchResults from "./EquipmentListsSearchResults";


const EquipmentListSearch = () => {
    const {currentUser} = useContext(UserContext);

    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [searchError, setSearchError] = useState(null);
    const [resultsLists, setResultLists] = useState("");

    const [trip, setTrip] = useState((currentUser && currentUser.trip) ? currentUser.trip : null);

    var equipmentListsResults;

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
                equipmentListsResults = await searchPublicEquipmentListDocuments(destination, season, category);
                setResultLists(equipmentListsResults);
                if (currentUser && currentUser.trip) {
                    setTrip(currentUser.trip);
                }
            }
            catch (searchError) {
                setSearchError('Error fetching public equipment lists');
            }
        }

        fetchData();

    }, [currentUser]);

    const handleChangeSeason = (event) => {
        setSeason(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const searchPublicEquipmentListDB = async (event, destination, season, category, setResultLists) => {
        event.preventDefault();
        try {
            equipmentListsResults = await searchPublicEquipmentListDocuments(destination, season, category);
            setResultLists(equipmentListsResults);
        }
        catch (searchError) {
            setSearchError('Error searching public equipment lists');
        }

        setDestination("");
        setSeason("");
        setCategory("");
    };

    return (
        <ThemeProvider theme={myTheme}>
            <div className="equipmentlistsearch">
                <div className="background">
                    <div className="container">
                        <div className="title">
                            Search an Equipment List
                        </div>
                        <div className="formcontainer">
                            <form className="el-search-form"
                                  onSubmit={event => {
                                      searchPublicEquipmentListDB(event, destination, season, category, setResultLists);
                                  }}>
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
                                    <button
                                        className="el-search-button"
                                        type="submit">
                                        Search</button>
                                    {searchError &&
                                    <div className="error-no-search">
                                        <i className="fa fa-large fa-exclamation-circle"></i> {searchError}
                                    </div>
                                    }
                                </div>
                            </form>
                            <div className="goto-ownlist">
                                Have your own list? Add it <Link className="goto-ownlist-link" to="/personalequipmentlist"> Here </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contentcontainer">
                    <div className="resultscontainer">
                        <div className="results-title">
                            <h4>Search Results</h4>
                        </div>
                        {resultsLists ? <EquipmentListsSearchResults lists={resultsLists} user={currentUser} trip={trip} />
                            :
                            <Loading />}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default EquipmentListSearch;
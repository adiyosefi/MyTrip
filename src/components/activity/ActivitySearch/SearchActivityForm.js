import React from 'react';
import './ActivitySearch.css';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {countries} from "../../../server/countries";
import MenuItem from "@material-ui/core/MenuItem";
import {searchActivitiesDocuments} from "../../../server/firebase";
import {makeStyles} from "@material-ui/core/styles";


const SearchActivityForm = ({activityName, setActivityName, destination, setDestination, season, setSeason, category,
                                setCategory, searchError, setSearchError, setActivitiesResults, activitiesSearchResults}) => {

    // change Material UI style
    const useStyles = makeStyles(theme => ({
        option: {
            fontSize: 14,
        },
        selectRoot: {
            textAlign: "left",
        },
    }));
    const classes = useStyles();

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
                    <button
                        className="activity-search-button"
                        type="submit">
                        Search</button>
                    {searchError &&
                    <div className="search-error-message">
                        <i className="fa fa-exclamation-circle"></i> {searchError}
                    </div>
                    }
                </div>
            </div>
        </form>
    );
};

export default SearchActivityForm;
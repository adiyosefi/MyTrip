import React, { useState } from "react";
import './AddEquipmentListToDBForm.css';
import { generatePublicEquipmentListDocument } from './../../../server/firebase';
import { countries } from './../../../server/countries';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';

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
        }
    }
});

export function AddEquipmentListToDBForm({ displayName, equipmentList, toggleAddEquipmentListToDBForm }) {
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [errorContent, setErrorContent] = useState(null);
    const [errorBoolean, setErrorBoolean] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);

    const useStyles = makeStyles(theme => ({
        option: {
            fontSize: 14,
            '& > span': {
                marginRight: 10,
                fontSize: 18,
            }
        }
    }));

    const classes = useStyles();


    const handleChangeSeason = (event) => {
        setSeason(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const createPublicEquipmentListToDB = (event, displayName, destination, season, category, equipmentList) => {
        event.preventDefault();
        if (destination && equipmentList) {
            try {
                generatePublicEquipmentListDocument(displayName, destination, season, category, equipmentList);
                console.log('list created successfully');
                setSuccessMessage('List added successfully!');
                // redirect to list page
            }
            catch (errorBoolean) {
                setErrorBoolean(true);
                setErrorContent('Error generating public equipment list');
            }
        } else {
            setErrorBoolean(true);
            setErrorContent('Fill required field');
        }

        setDestination("");
        setSeason("");
        setCategory("");
    };


    return (
        <ThemeProvider theme={myTheme}>
            <div className="addequipmentlisttodbform">
                <form>
                    <div className="destination-input">
                        <Autocomplete
                            style={{ width: 230 }}
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
                                    label="Choose destination"
                                    error={errorBoolean}
                                    helperText={errorContent}
                                    required
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
                            style={{ width: 180 }}
                            onChange={handleChangeCategory}
                            variant="outlined"
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
                    <div className="buttons-end">
                        <button
                            className="add-list-to-db-button"
                            onClick={event => {
                                createPublicEquipmentListToDB(event, displayName, destination, season, category, equipmentList);
                            }}>
                            Add List to our Database!</button>
                    </div>
                    <div className="success-mess">
                        {successMessage}
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default AddEquipmentListToDBForm;


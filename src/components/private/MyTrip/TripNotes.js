import React, {useState} from 'react';
import './MyTrip.css';
import TextField from "@material-ui/core/TextField";

// HOOKS
import {useNotes} from "../../../hooks/useNotes";

const TripNotes = ({ user }) => {
    const [notes, setNotes] = useNotes(user);

    const [notesError, setNotesError] = useState(null);

    const clearNotesInTrip = async (event, notes) => {
        event.preventDefault();
        if (notes) {
            setNotes("");
        } else {
            setNotesError('Notes is not filled');
        }
    };

    const handleChangeNotes = (event) => {
        setNotes(event.target.value);
    };

    return (
        <div className="notescontainer">
            <h4>My Notes</h4>
            <div className="text">
                <form>
                    <div className="text-field-notes-container">
                    <TextField
                        id="notepad"
                        name="notes"
                        label="Start typing ..."
                        multiline
                        rows={7}
                        style={{ width: "100%" }}
                        value={notes}
                        variant="outlined"
                        onChange={handleChangeNotes}
                    />
                    </div>
                    <div className="clear-notes-button-and-error">
                        <button className="clear-notes-button" onClick={event => {
                            clearNotesInTrip(event, notes);
                        }}>Clear notes</button>
                        {notesError &&
                        <div className="error-no-notes">
                            <i className="fa fa-large fa-exclamation-circle"></i> {notesError}
                        </div>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripNotes;
import React from 'react';
import './ActivitySearch.css';

const SetAsFavoriteActivityButtonSearch = ({currentUser, favActivitySuccess, favActivityError}) => {
    return (
        <div className="submit-fav-act-button-container">
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
    );
};

export default SetAsFavoriteActivityButtonSearch;
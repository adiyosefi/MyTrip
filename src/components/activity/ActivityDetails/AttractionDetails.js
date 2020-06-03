import React from 'react';
import './ActivityDetails.css';

const AttractionDetails = ({activity}) => {
    return (
        <div>
            <div className="activity-attraction-metadata">
                <div className="activity-attraction-metadata-item">
                    <span>Activity type:</span> {activity.data.type}
                </div>
                <div className="activity-attraction-metadata-item">
                    <span>Suggested duration:</span> {activity.data.suggestedDuration}
                </div>
                <div className="activity-attraction-metadata-item">
                    <span>Phone:</span> {activity.data.phone}
                </div>
                <div className="activity-attraction-metadata-item">
                    <a href={activity.data.website} target='_blank' rel="noopener noreferrer"><span>Website </span><i className="fa fa-large fa-external-link"></i></a>
                </div>
            </div>
        </div>
    );
};

export default AttractionDetails;
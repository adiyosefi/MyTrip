import React from 'react';
import './ActivityDetails.css';

const AttractionDetails = ({activity}) => {
    return (
        <div>
            <div className="activity-attraction-metadata">
                <div className="activity-attraction-metadata-item">
                    <span><span className="underline-title">Activity type:</span></span> <span>{activity.data.type}</span>
                </div>
                <div className="activity-attraction-metadata-item">
                    <span><span className="underline-title">Suggested duration:</span></span> <span>{activity.data.suggestedDuration}</span>
                </div>
            </div>
            <div className="activity-attraction-metadata-contact">
                <div className="activity-attraction-metadata-phone-item">
                    <span><span className="underline-title">Phone:</span></span> <span>{activity.data.phone}</span>
                </div>
                <div className="activity-attraction-metadata-website-item">
                    <a href={activity.data.website} target='_blank' rel="noopener noreferrer"><span className="underline-title">Website </span><i className="fa fa-large fa-external-link"></i></a>
                </div>
            </div>
        </div>
    );
};

export default AttractionDetails;
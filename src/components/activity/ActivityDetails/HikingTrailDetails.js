import React from 'react';
import './ActivityDetails.css';

const HikingTrailDetails = ({activity}) => {
    return (
        <div className="activity-hiking-metadata">
            <div className="activity-hiking-metadata-item">
                <span><span className="underline-title">Activity type:</span></span> <span>{activity.data.type}</span>
            </div>
            <div className="activity-hiking-metadata-item">
                <span><span className="underline-title">Route:</span></span> <span>{activity.data.route}</span>
            </div>
            <div className="activity-hiking-metadata-item">
                <span><span className="underline-title">Difficulty:</span></span> <span>{activity.data.difficulty}</span>
            </div>
            <div className="activity-hiking-metadata-item">
                <span><span className="underline-title">Extension:</span></span> <span>{activity.data.extension}</span>
            </div>
            <div className="activity-hiking-metadata-item">
                <span><span className="underline-title">Time average:</span></span> <span>{activity.data.timeAverage}</span>
            </div>
        </div>
    );
};

export default HikingTrailDetails;
import React from 'react';
import './ActivityDetails.css';

const HikingTrailDetails = ({activity}) => {
    return (
        <div className="activity-hiking-metadata">
            <div className="activity-hiking-metadata-item">
                <span>Activity type:</span> {activity.data.type}
            </div>
            <div className="activity-hiking-metadata-item">
                <span>Route:</span> {activity.data.route}
            </div>
            <div className="activity-hiking-metadata-item">
                <span>Difficulty:</span> {activity.data.difficulty}
            </div>
            <div className="activity-hiking-metadata-item">
                <span>Extension:</span> {activity.data.extension}
            </div>
            <div className="activity-hiking-metadata-item">
                <span>Time average:</span> {activity.data.timeAverage}
            </div>
        </div>
    );
};

export default HikingTrailDetails;
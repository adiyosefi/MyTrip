import React from 'react';
import './ActivityDetails.css';

const RestaurantDetails = ({activity}) => {
    return (
        <div>
            <div className="activity-restaurant-metadata">
                <div className="activity-restaurant-metadata-item">
                    <span><span className="underline-title">Activity type:</span></span> <span>{activity.data.type}</span>
                </div>
                <div className="activity-restaurant-metadata-item">
                    <span><span className="underline-title">Cuisines:</span></span> <span>{activity.data.cuisines}</span>
                </div>
                <div className="activity-restaurant-metadata-item">
                    <span><span className="underline-title">Price Range:</span></span> <span>{activity.data.priceRange}</span>
                </div>
            </div>
            <div className="activity-restaurant-metadata-contact">
                <div className="activity-restaurant-metadata-phone-item">
                    <span><span className="underline-title">Phone:</span></span> <span>{activity.data.phone}</span>
                </div>
                <div className="activity-restaurant-metadata-webtite-item">
                    <a href={activity.data.website} target='_blank' rel="noopener noreferrer"><span className="underline-title">Website </span><i className="fa fa-large fa-external-link"></i></a>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
import React from 'react';
import './ActivityDetails.css';


const RestaurantDetails = ({activity}) => {
    return (
        <div>
            <div className="activity-restaurant-metadata">
                <div className="activity-restaurant-metadata-item">
                    <span>Activity type:</span> {activity.data.type}
                </div>
                <div className="activity-restaurant-metadata-item">
                    <span>Cuisines:</span> {activity.data.cuisines}
                </div>
                <div className="activity-restaurant-metadata-item">
                    <span>Price Range:</span> {activity.data.priceRange}
                </div>
            </div>
            <div className="activity-restaurant-metadata-contact">
                <div className="activity-restaurant-metadata-item">
                    <span>Phone:</span> {activity.data.phone}
                </div>
                <div className="activity-restaurant-metadata-item">
                    <a href={activity.data.website} target='_blank' rel="noopener noreferrer"><span>Website </span><i className="fa fa-large fa-external-link"></i></a>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;
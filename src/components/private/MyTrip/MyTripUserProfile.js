import React from 'react';
import './MyTrip.css';
import {auth} from "../../../server/firebase";

const MyTripUserProfile = ({photoURL, displayName, email }) => {
    return (
        <>
            <div className="user-picrute-container">
                <img className="profile-picture" alt="user-profile"
                     src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fprofile-pictures%2Fblank-profile-picture.png?alt=media&token=fd112c3c-e460-4e37-997b-36a914682bf9'} />
            </div>
            <div className="user-details-metadata">
                <h2 className="">{displayName}</h2>
                <h3 className="">{email}</h3>
            </div>
            <button className="signout-button" onClick={() => { auth.signOut(); }}>Sign out <i className="fa fa-sign-out"></i></button>
        </>
    );
};

export default MyTripUserProfile;
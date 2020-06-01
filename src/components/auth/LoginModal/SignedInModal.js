import React from 'react';
import './LoginModal.css';
import {Link} from "react-router-dom";
import {auth} from "../../../server/firebase";

const SignedInModal = ({currentUser, toggleModal}) => {

    return (
        <div className="loginmodal">
            <div className="overlay">
                <div className="dialog">
                    <div className="togglemodal-button-container">
                        <button onClick={toggleModal} className="togglemodal-button">&times;</button>
                    </div>
                    <div className="other-details-login">
                        <div className="login-hello">
                            Hello {currentUser.displayName}!
                        </div>
                        <div className="login-goto-yourtrip">
                            You're already signed in! Go to your trip <Link className="here-link" to="/mytrip">HERE</Link>.
                        </div>
                        <div className="sign-out-button-container">
                            <button className="signout-button" onClick={() => { auth.signOut(); toggleModal(); }}>
                                Sign out <i className="fa fa-sign-out"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignedInModal;
import React from 'react';
import './SignInUp.css';
import _ from "underscore";
import UserProfileContainer from "./UserProfileContainer";
import SignInUpContainer from "./SignInUpContainer";

const SignInUpPageContainer = ({user}) => {
    return (
        <div className="signinup">
            <div className="background">
                <div className="content-container">
                    {!_.isEmpty(user) ? <UserProfileContainer user={user} /> : <SignInUpContainer />}
                </div>
            </div>
        </div>
    );
};

export default SignInUpPageContainer;
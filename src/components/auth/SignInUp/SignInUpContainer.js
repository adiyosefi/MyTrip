import React from 'react';
import './SignInUp.css';
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";


const SignInUpContainer = () => {
    return (
        <>
            <div className="signin-cont">
                <SignIn />
            </div>
            <div className="signup-cont">
                <SignUp />
            </div>
        </>
    );
};

export default SignInUpContainer;
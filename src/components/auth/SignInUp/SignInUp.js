import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../../server/firebase';
import { UserContext } from '../../../context/user';
import './SignInUp.css';
import SignIn from './../SignIn/SignIn'
import SignUp from './../SignUp/SignUp'


const RenderSignInUp = () => {
  return (
    <div className="signinup">
        <div className="background">
        <div className="content-container">
        <div className="signin-cont">
            <SignIn />
        </div>
        <div className="signup-cont">
            <SignUp />
        </div>
        </div>
        </div>
      </div>
  );
}

const SignInUp = () => {

  return (
     <RenderSignInUp /> 
  );
};

export default SignInUp;
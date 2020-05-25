import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../../server/firebase';
import { UserContext } from '../../../context/user';
import './SignInUp.css';
import SignIn from './../SignIn/SignIn'
import SignUp from './../SignUp/SignUp'
import { AuthContext } from "../../../context/auth";
import Loading from './../../global/Loading';

const RenderUserProfile = ({ user }) => {
  const { photoURL, displayName, email } = user;

  return (
    <div className="user-profile-cont">
      <div className="user-profile-title">
        <h1>My Profile</h1>
      </div>
      <div className="user-profile-data">
      <div className="user-picrute-container">
        <img className="profile-picture"
          src={photoURL || 'https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Fprofile-pictures%2Fblank-profile-picture.png?alt=media&token=fd112c3c-e460-4e37-997b-36a914682bf9'} />
      </div>
      <div className="user-details-metadata">
        <h2 className="">{displayName}</h2>
        <h3 className="">{email}</h3>
      </div>
      </div>
      <button className="signout-button" onClick={() => { auth.signOut(); }}>Sign out <i className="fa fa-sign-out"></i></button>
      <div className="login-goto-yourtrip">
                Go to your trip <Link className="here-link" to="/mytrip">HERE</Link>.
                </div>
    </div>
  );
}

const RenderSignInUp = () => {
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
}

const RenderPage = ({ user, isAuthenticated }) => {
  return (
    <div className="signinup">
      <div className="background">
        <div className="content-container">
          {isAuthenticated && user ? <RenderUserProfile user={user} /> : <RenderSignInUp />}
        </div>
      </div>
    </div>
  );
}

const SignInUp = () => {
  const user = useContext(UserContext);
  const { isAuthenticated, isLoading } = useContext(AuthContext)

  return (
    isLoading ? <Loading /> : <RenderPage user={user} isAuthenticated={isAuthenticated}/>
  );
};

export default SignInUp;
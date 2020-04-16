import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../../server/firebase';
import { UserContext } from '../../../context/user';


const SignIn = () => {
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const renderSignIn = () => {
    return (
      <div className=" ">
        <h1 className=" ">Sign In</h1>
        <div className="">
          {error !== null && <div className="">{error}</div>}
          <form className="">
            <label htmlFor="userEmail" className="block">
              Email:
          </label>
            <input
              type="email"
              className=""
              name="userEmail"
              value={email}
              placeholder="E.g: faruq123@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
            <label htmlFor="userPassword" className="">
              Password:
          </label>
            <input
              type="password"
              className=""
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <button className="" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
              Sign in
          </button>
          </form>
          <p className="">or</p>
          <button
            className=""
            onClick={signInWithGoogle}>
            Sign in with Google
        </button>
          <p className="">
            Don't have an account?{" "}
            <Link to="signup" className="">
              Sign up here
          </Link>{" "}
            <br />{" "}
            <Link to="passwordreset" className="">
              Forgot Password?
          </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
    { user ? <Redirect to="/mytrip" /> : renderSignIn()}
    </>
  );
};
export default SignIn;
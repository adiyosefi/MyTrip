import React, { useState, useEffect, useContext } from "react";
import { Redirect, Link } from 'react-router-dom';
import { auth, signInWithGoogle } from '../../../server/firebase';
import { UserContext } from '../../../context/user';
import './SignIn.css';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PasswordReset from './../PasswordReset/PasswordReset'

const myTheme = createMuiTheme({
  typography: {
      fontFamily: 'Poppins, sans-serif'
  },
  overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
          root: { // Name of the rule
              fontSize: 14,
              "&$focused:not($error)": { // increase the specificity for the pseudo class
                  color: "#9c9c9c"
              },
              '&:hover:not($error)': {
                  color: "#9c9c9c",
              }
          }
      },
      MuiOutlinedInput: {
          root: {
              '& $notchedOutline': {
                  borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover:not($disabled):not($focused):not($error) $notchedOutline': {
                  borderColor: '#9c9c9c',
                  // Reset on touch devices, it doesn't add specificity
                  '#media (hover: none)': {
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                  },
              },
              '&$focused $notchedOutline': {
                  borderColor: '#9c9c9c',
                  borderWidth: 1,
              },
          },
      }
  }
});


const SignIn = () => {
  const user = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailErrorContent, setEmailErrorContent] = useState(null);
    const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
    const [passwordErrorContent, setPasswordErrorContent] = useState(null);
    const [passwordErrorBoolean, setPasswordErrorBoolean] = useState(false);
    const [loginSuccessMessage, setLoginSuccessMessage] = useState(null);
    const [loginErrorMessage, setLoginErrorMessage] = useState(null);

    const [isForgotPsaawordOpen, setIsForgotPsaawordOpen] = useState(false);

function toggleIsForgotPsaawordOpen() {
  setIsForgotPsaawordOpen(!isForgotPsaawordOpen);
}

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    if (email && password){
    auth.signInWithEmailAndPassword(email, password).catch(loginErrorMessage => {
      setLoginErrorMessage("Error signing in with password and email!");
      console.error("Error signing in with password and email", loginErrorMessage);
    });
    setLoginSuccessMessage('Signed in successfully! 🎉');
    //window.location.href = '/mytrip';
    }
    else if (!email && password){
        setEmailErrorBoolean(true);
        setEmailErrorContent('Enter your email');
    }
    else if (email && !password){
        setPasswordErrorBoolean(true);
        setPasswordErrorContent('Enter your password');
    }
    else if (!email && !password){
        setEmailErrorBoolean(true);
        setEmailErrorContent('Enter your email');
        setPasswordErrorBoolean(true);
        setPasswordErrorContent('Enter your password');
    }
    setEmail("");
    setPassword("");
  };

  const renderSignIn = () => {
    return (
      <ThemeProvider theme={myTheme}>
      <div className="signin-container">
        <div className="signin-title">
        <h1 className="">Sign In</h1>
        </div>
        <div className="login-form">
            <form>
                <div className="email-container-login">
                <TextField
          required
          style={{ width: 230 }}
          id="emailInput"
          label="Email"
          type="email"
          value={email}
          error={emailErrorBoolean}
            helperText={emailErrorContent}
          variant="outlined"
        onChange={handleEmailChange}
        />
                </div>
                <div className="password-container-login">
                <TextField
          required
          style={{ width: 230 }}
          id="passwordInput"
          label="Password"
          type="password"
          value={password}
          error={passwordErrorBoolean}
            helperText={passwordErrorContent}
          variant="outlined"
        onChange={handlePasswordChange}
        />
                </div>
                <div className="signin-button-and-messages">
                <button className="signin-button" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
              Sign in
          </button>
          </div>
            </form>
            <div className="login-with-google">
            <p className="or-paragraph">or</p>
          <button
            className="login-google-button"
            onClick={signInWithGoogle}>
            Sign in with Google
        </button>
        {loginSuccessMessage &&
                            <div className="signin-success-message">
                            <i className="fa fa-check-circle"></i> {loginSuccessMessage}
                            </div>
                            }
          {loginErrorMessage && 
                            <div className="error-no-signin">
                            <i className="fa fa-large fa-exclamation-circle"></i> {loginErrorMessage}
                            </div>
                            }
        </div>
            <div className="other-details-login">
                <div className="login-no-password">
                <button onClick={toggleIsForgotPsaawordOpen} 
                className={`${isForgotPsaawordOpen ? 'open-forgot-password-button' : 'forgot-password-button'}`}>
                    {`${isForgotPsaawordOpen ? 'Close' : 'Forgot Password?'}`}</button>
                <div>
                    {isForgotPsaawordOpen && <PasswordReset />}
                </div>
                </div>
                </div>
        </div>
      </div>
      </ThemeProvider>
    );
  }

  return (
    <>
    {renderSignIn()}
    </>
  );
};
export default SignIn;
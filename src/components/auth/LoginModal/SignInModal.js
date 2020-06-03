import React, {useState} from 'react';
import './LoginModal.css';
import {myTheme} from "../../../themes/myTheme";
import TextField from "@material-ui/core/TextField";
import {auth, signInWithGoogle} from "../../../server/firebase";
import {Link} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core/styles";
import PasswordReset from "../PasswordReset/PasswordReset";

const SignInModal = ({toggleModal}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorContent, setEmailErrorContent] = useState(null);
    const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
    const [passwordErrorContent, setPasswordErrorContent] = useState(null);
    const [passwordErrorBoolean, setPasswordErrorBoolean] = useState(false);
    const [loginModalSuccessMessage, setLoginModalSuccessMessage] = useState(null);
    const [loginModalErrorMessage, setLoginModalErrorMessage] = useState(null);

    const [isForgotPsaawordOpen, setIsForgotPsaawordOpen] = useState(false);
    function toggleIsForgotPsaawordOpen() {
        setIsForgotPsaawordOpen(!isForgotPsaawordOpen);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log("email", email);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log("password", password);
    };

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        if (email && password){
            auth.signInWithEmailAndPassword(email, password).catch(loginModalErrorMessage => {
                setLoginModalErrorMessage("Error signing in with password and email!");
                console.error("Error signing in with password and email", loginModalErrorMessage);
            });
            setLoginModalSuccessMessage('Signed in successfully! 🎉');
            toggleModal();
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

    return (
        <ThemeProvider theme={myTheme}>
            <div className="loginmodal">
                <div className="overlay">
                    <div className="dialog">
                        <div className="togglemodal-button-container">
                            <button onClick={toggleModal} className="togglemodal-button">&times;</button>
                        </div>
                        <div className="login-form">
                            <form>
                                <div className="email-container-login">
                                    <TextField
                                        required
                                        style={{ width: 230 }}
                                        id="email-input"
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
                                        id="password-input"
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
                                    <button className="signin-modal-button" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>
                                        Sign in
                                    </button>
                                    {loginModalSuccessMessage &&
                                    <div className="signin-success-message">
                                        <i className="fa fa-check-circle"></i> {loginModalSuccessMessage}
                                    </div>
                                    }
                                    {loginModalErrorMessage &&
                                    <div className="error-no-signin">
                                        <i className="fa fa-large fa-exclamation-circle"></i> {loginModalErrorMessage}
                                    </div>
                                    }
                                </div>
                            </form>
                            <div className="login-with-google">
                                <p className="or-paragraph">or</p>
                                <button
                                    className="login-with-google-button"
                                    onClick={signInWithGoogle}>
                                    Sign in with Google
                                </button>
                            </div>
                            <div className="other-details-login">
                                <div className="login-no-account">
                                    Don't have an account yet? Sign up <Link className="here-link" to="signinup">HERE</Link>.
                                </div>
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
                </div>
            </div>
        </ThemeProvider>
    );
};

export default SignInModal;
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import './LoginModal.css';
import { ModalContext } from '../../../context/modal';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { auth, signInWithGoogle } from '../../../server/firebase';
import { UserContext } from '../../../context/user';
import _ from "underscore";


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

export function LoginModal() {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrorContent, setEmailErrorContent] = useState(null);
    const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
    const [passwordErrorContent, setPasswordErrorContent] = useState(null);
    const [passwordErrorBoolean, setPasswordErrorBoolean] = useState(false);
    const [loginModalSuccessMessage, setLoginModalSuccessMessage] = useState(null);
    const [loginModalErrorMessage, setLoginModalErrorMessage] = useState(null);

    const {currentUser} = useContext(UserContext);


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

    const renderSignInModal = () => {
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
                                        Don't have an account yet? Sign up <Link className="here-link" to="signup">HERE</Link>.
                                    </div>
                                    <div className="login-no-password">
                                        <Link to="passwordreset" className="forgot-link">Forgot Password?</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        );
    }

    const renderSignedInModal = () => {
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
    }

    if (isModalOpen) {
        return (
            <>
                { !_.isEmpty(currentUser) ? renderSignedInModal() : renderSignInModal()}
            </>
        );
    }
    return (
        null)
        ;
}

export default LoginModal;


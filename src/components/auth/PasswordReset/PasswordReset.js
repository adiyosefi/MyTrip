import React, { useState } from "react";
import {auth} from '../../../server/firebase';
import './PasswordReset.css';
import TextField from '@material-ui/core/TextField';


const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
    const [emailErrorContent, setEmailErrorContent] = useState(null);
    const [error, setError] = useState(null);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const sendResetEmail = event => {
        event.preventDefault();
        if (email) {
            auth
                .sendPasswordResetEmail(email)
                .then(() => {
                    setEmailHasBeenSent(true);
                    setError(false);
                    setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
                })
                .catch(() => {
                    setError("Error resetting password");
                });
        } else {
            setEmailErrorBoolean(true);
            setEmailErrorContent('Enter your email');
        }
    };

    return (
        <div className="passwordreset">
            <div className="passwordreset-title">
                <h4 className="passwordreset-title">
                    Reset your Password
                </h4>
            </div>
            <div className="passwordreset-form">
                <form>
                    <div className="password-email-input">
                        <TextField
                            required
                            style={{ width: 230 }}
                            id="userEmail"
                            label="Input your email"
                            type="email"
                            value={email}
                            error={emailErrorBoolean}
                            helperText={emailErrorContent}
                            variant="outlined"
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="password-button-and-errors">
                        <button
                            className="password-button"
                            onClick={sendResetEmail}
                        >
                            Send me a reset link
                        </button>
                        {emailHasBeenSent && (
                            <div className="password-success">
                                An email has been sent to you!
                            </div>
                        )}
                        {error && !emailHasBeenSent && (
                            <div className="password-error">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
export default PasswordReset;
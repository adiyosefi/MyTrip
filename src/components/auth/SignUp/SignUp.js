import React, { useState } from "react";
import { auth, storage, signInWithGoogle, generateUserDocument } from '../../../server/firebase'
import FileUploader from "react-firebase-file-uploader";
import './SignUp.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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

const SignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const [nameErrorContent, setNameErrorContent] = useState(null);
  const [nameErrorBoolean, setNameErrorBoolean] = useState(false);
  const [emailErrorContent, setEmailErrorContent] = useState(null);
  const [emailErrorBoolean, setEmailErrorBoolean] = useState(false);
  const [passwordErrorContent, setPasswordErrorContent] = useState(null);
  const [passwordErrorBoolean, setPasswordErrorBoolean] = useState(false);
  const [signupSuccessMessage, setSignupSuccessMessage] = useState(null);
  const [signupErrorMessage, setSignupErrorMessage] = useState(null);

  // picture states
  const [photoURL, setPhotoURL] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  }

  const handleUploadError = (error) => {
    setIsUploading(false);
    console.error(error);
  }

  const handleUploadSuccess = (filename) => {
    setIsUploading(false);
    setUploadProgress(100);
    storage
      .ref("images/profile-pictures")
      .child(filename)
      .getDownloadURL()
      .then(url => setPhotoURL(url));
    console.log(photoURL);
  }

  const handleProgress = (progress) => {
    setUploadProgress(progress);
  }

  const createUserWithEmailAndPasswordHandler = async (event, email, password, displayName, photoURL) => {
    event.preventDefault();
    if (email && password && displayName) {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await generateUserDocument(user, { displayName, photoURL });
        setSignupSuccessMessage('Signed up successfully! 🎉');
        window.location.href = '/mytrip';
      }
      catch (signupErrorMessage) {
        setSignupErrorMessage('Error signing up with email and password');
      }
    }
    else if (!email && password && displayName) {
      setEmailErrorBoolean(true);
      setEmailErrorContent('Enter your email');
    }
    else if (email && !password && displayName) {
      setPasswordErrorBoolean(true);
      setPasswordErrorContent('Enter your password');
    }
    else if (!email && !password && displayName) {
      setEmailErrorBoolean(true);
      setEmailErrorContent('Enter your email');
      setPasswordErrorBoolean(true);
      setPasswordErrorContent('Enter your password');
    }
    else if (email && password && !displayName) {
      setNameErrorBoolean(true);
      setNameErrorContent('Enter your name');
    }
    else if (email && !password && !displayName) {
      setNameErrorBoolean(true);
      setNameErrorContent('Enter your name');
      setPasswordErrorBoolean(true);
      setPasswordErrorContent('Enter your password');
    }
    else if (!email && password && !displayName) {
      setNameErrorBoolean(true);
      setNameErrorContent('Enter your name');
      setEmailErrorBoolean(true);
      setEmailErrorContent('Enter your email');
    }
    else if (!email && !password && !displayName) {
      setNameErrorBoolean(true);
      setNameErrorContent('Enter your name');
      setEmailErrorBoolean(true);
      setEmailErrorContent('Enter your email');
      setPasswordErrorBoolean(true);
      setPasswordErrorContent('Enter your password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
    setPhotoURL("");
  };

  const handleNameChange = (event) => {
    setDisplayName(event.target.value);
    console.log("handleNameChange", displayName);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const renderSignUp = () => {
    return (
      <ThemeProvider theme={myTheme}>
        <div className="signup-container">
          <div className="signup-title">
            <h1 className="">Sign Up</h1>
          </div>
          <div className="login-no-account">
                    Don't have an account yet? Sign up here...
                </div>
          <div className="signup-form">
            <form>
              <div className="name-input">
                <TextField
                  required
                  style={{ width: 230 }}
                  id="name-input"
                  label="Display Name"
                  type="text"
                  value={displayName}
                  error={nameErrorBoolean}
                  helperText={nameErrorContent}
                  variant="outlined"
                  onChange={handleNameChange}
                />
                </div>
                <div className="email-input">
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
                <div className="password-input">
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
                {/* Image uploader*/}
                <div className="picture-input">
                  <label className="picture-label">
                    Select your profile picture
          <FileUploader
                      hidden
                      accept="image/*"
                      name="userPicture"
                      className="picture-uploader"
                      filename={file => file.name}
                      storageRef={storage.ref('images/profile-pictures')}
                      onUploadStart={handleUploadStart}
                      onUploadError={handleUploadError}
                      onUploadSuccess={handleUploadSuccess}
                      onProgress={handleProgress}
                    />
                  </label>
                  <div className="picture-progress">
                    {isUploading && <p>Upload progress: {uploadProgress}%</p>}
                    {isUploading && <LinearProgress variant="determinate" value={uploadProgress} width={200} />}
                  </div>
                  <div className="picture-container">
                    {photoURL && <img src={photoURL} className="user-picture" alt="uploaded-pic" />}
                  </div>
                </div>
                <div className="signup-button-and-messages">
                  <button
                    className="signup-button"
                    onClick={event => {
                      createUserWithEmailAndPasswordHandler(event, email, password, displayName, photoURL);
                    }}
                  >
                    Sign up
          </button>
                  </div>
        </form>
              <div className="signup-with-google">
                <p className="or-paragraph">or</p>
                <button
                  className="signup-google-button"
                  onClick={signInWithGoogle}
                >
                  Sign In with Google
        </button>
        {signupSuccessMessage &&
                    <div className="signup-success-message">
                      <i className="fa fa-check-circle"></i> {signupSuccessMessage}
                    </div>
                  }
                  {signupErrorMessage &&
                    <div className="error-no-signup">
                      <i className="fa fa-large fa-exclamation-circle"></i> {signupErrorMessage}
                    </div>
                  }
              </div>
      </div>
          </div>
    </ThemeProvider>
    );
  }

  return (
        <>
          {/* user ? <Redirect to="/mytrip" /> : renderSignUp()*/}
          {renderSignUp()}
        </>
  );
};
export default SignUp;
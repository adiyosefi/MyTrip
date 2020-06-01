import React, { useContext } from "react";
import { UserContext } from '../../../context/user';
import './SignInUp.css';
import Loading from './../../global/Loading';
import SignInUpPageContainer from "./SignInUpPageContainer";

const SignInUp = () => {
    const {currentUser, isLoading} = useContext(UserContext);

    return (
        isLoading ? <Loading /> : <SignInUpPageContainer user={currentUser} />
    );
};

export default SignInUp;
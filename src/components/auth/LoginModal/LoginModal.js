import React, { useContext } from "react";
import './LoginModal.css';
import { ModalContext } from '../../../context/modal';
import { UserContext } from '../../../context/user';
import _ from "underscore";
import SignedInModal from "./SignedInModal";
import SignInModal from "./SignInModal";


export function LoginModal() {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    const {currentUser} = useContext(UserContext);

    if (isModalOpen) {
        return (
            <>
                { !_.isEmpty(currentUser) ?
                    <SignedInModal currentUser={currentUser} toggleModal={toggleModal}/>
                :
                    <SignInModal toggleModal={toggleModal}/> }
            </>
        );
    }
    return (null);
}

export default LoginModal;


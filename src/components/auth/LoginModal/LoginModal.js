import React, { useContext } from "react";
import './LoginModal.css';
import { ModalContext } from '../../../context/modal';


export function LoginModal() {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    if (isModalOpen) {
        return (
            <div className="loginmodal">
                <div className="overlay">
                    <div className="dialog">
                        <p>
                            It's a modal{" "}
                            <span role="img" aria-label="tada">
                                🎉
                            </span>
                        </p>
                        <button onClick={toggleModal}>CLOSE MODAL</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        null)
        ;
}

export default LoginModal;


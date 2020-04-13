import React, { useContext } from "react";
import { modalContext } from '../context/modal';
import '../styles/LoginModal.css';


export function LoginModal() {
    const setIsModalOpen = useContext(modalContext);

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
                    <button onClick={() => setIsModalOpen(false)}>CLOSE MODAL</button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;


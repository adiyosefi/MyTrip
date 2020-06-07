import React, {useContext, useState} from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { ModalContext } from '../../../context/modal';

const Header = () => {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    const [isExpanded, setIsExpanded ] = useState(false);

    const [isEquipmentExpanded, setIsEquipmentExpanded ] = useState(false);

    const handleMenuToggle = (e) => {
        e.preventDefault();
        setIsExpanded(!isExpanded);
    }

    const handleEquipmentToggle = (e) => {
        e.preventDefault();
        setIsEquipmentExpanded(!isEquipmentExpanded);
    }


    return (
        <div className="header">
            <div className="navlist">
                <div className="logo-container">
                    <Link to="/home" className="logo"><img alt="logo" src="https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Flogo.png?alt=media&token=77df1670-fc74-4324-bbd1-178410670546" /></Link>
                </div>
                <div className="nav-container">
                        <i
                            className="fa fa-bars"
                            aria-hidden="true"
                            onClick={e => handleMenuToggle(e)}
                        />
                    <ul className={`collapsed ${isExpanded ? "is-expanded" : ""}`}>
                        <div className="main-menu-items">
                            <li><NavLink to="/home" className="navitem">Home</NavLink></li>
                            <li><NavLink to="/about" className="navitem">About</NavLink></li>
                            <li className={`navitem-equipment ${isEquipmentExpanded ? "equipment-expanded" : ""}`}><NavLink to="/equipmentlistsearch" className="navitem dropbtn">Equipment Lists</NavLink>
                                <span className="drop-equipment-icon" onClick={e => handleEquipmentToggle(e)}>▾</span>
                                <ul className={`equipment-dropdown ${isEquipmentExpanded ? "is-equipment-expanded" : ""}`}>
                                    <li><NavLink to="/equipmentlistsearch" className="equipment-dropdown-item search-equipment-item">Search Equipment List</NavLink></li>
                                    <li><NavLink to="/personalequipmentlist" className="equipment-dropdown-item">Add Equipment List</NavLink></li>
                                </ul>
                            </li>
                            <li><NavLink to="/activities" className="navitem activities-nav-item">Activities</NavLink></li>
                            <li><NavLink to="/contact" className="navitem">Contact</NavLink></li>
                        </div>
                        <div className="last-menu-items">
                            <li><NavLink to="/mytrip" className={`${isExpanded ? "button-plan-is-expanded" : "button-plan"}`}>Plan Your Trip!</NavLink></li>
                            <li><button className={`button-login ${isExpanded ? "signin-button-is-expanded" : ""} ${isModalOpen ? 'button-login-modal-open' : ''}`}
                                        onClick={toggleModal}>
                                {isExpanded ? "Signin" : <i className="fa fa-lg fa-user"></i>}
                            </button></li>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;
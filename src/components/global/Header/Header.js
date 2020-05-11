import React, {useContext} from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { ModalContext } from '../../../context/modal';

const Header = () => {
    const {isModalOpen, toggleModal} = useContext(ModalContext);

    return (
            <div className="header">
                <ul className="navlist">
                    <Link to="/home" className="logo"><img src="https://firebasestorage.googleapis.com/v0/b/equiomentlist.appspot.com/o/images%2Flogo.png?alt=media&token=77df1670-fc74-4324-bbd1-178410670546" /></Link>
                    <li><NavLink to="/home" className="navitem">Home</NavLink></li>
                    <li><NavLink to="/about" className="navitem">About</NavLink></li>
                    <li className="navitem-equipment"><NavLink to="/equipmentlistsearch" className="navitem dropbtn">Equipment Lists</NavLink>
                        <ul className="equipment-dropdown">
                            <li><NavLink to="/equipmentlistsearch" className="equipment-dropdown-item">Search Equipment List</NavLink></li>
                            <li><NavLink to="/privateequipmentlist" className="equipment-dropdown-item">Add Equipment List</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink to="/activities" className="navitem">Activities</NavLink></li>
                    <li><NavLink to="/contact" className="navitem">Contact</NavLink></li>
                    <li><NavLink to="/mytrip" className="button-plan">Plan Your Trip!</NavLink></li>
                        <li><button className={`button-login ${isModalOpen ? 'button-login-modal-open' : ''}`}
                         onClick={toggleModal}>
                        <i className="fa fa-lg fa-user"></i>
                    </button>
                    </li>
                </ul>
            </div>
    );
};

export default Header;
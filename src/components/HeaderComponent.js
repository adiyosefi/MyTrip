import React from 'react';
import '../styles/Header.css';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <ul className="navlist">
                <Link to="/home" className="logo"><img src="/assets/images/logo.png"/></Link>
                <li><NavLink to="/home" className="navitem">Home</NavLink></li>
                <li><NavLink to="/about" className="navitem">About</NavLink></li>
                <li><NavLink to="/equipmentlist" className="navitem">Equipment Lists</NavLink></li>
                <li><NavLink to="/contact" className="navitem">Contact</NavLink></li>
                <li><NavLink to="/mytrip" className="button-plan">Plan Your Trip!</NavLink></li>
            </ul>
        </div>
    );
};

export default Header;
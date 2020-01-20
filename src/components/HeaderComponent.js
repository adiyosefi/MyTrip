import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Link to="/home" className="logo"><img src=""/></Link>
            <ul className="navlist">
                <li><Link to="/home" className="navitem">Home</Link></li>
                <li><Link to="#" className="navitem">About</Link></li>
                <li><Link to="/equipmentlist" className="navitem">Equipment Lists</Link></li>
                <li><Link to="#" className="navitem">Contact</Link></li>
            </ul>
        </div>
    );
};

export default Header;
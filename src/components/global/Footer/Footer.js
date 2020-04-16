import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <div className="container"></div>
            <div className="footer">
                <div className="main-footer">
                    <div className="footer-col col1">
                        <h2 className="footer-headline">MyTrip</h2>
                        <p> A free online trip planner that can help you build a personalized itinerary for your next vacation. </p>
                    </div>
                    <div className="footer-col col2">
                        <ul className="list-footer">
                            <li><h2 className="footer-headline">Information</h2></li>
                            <li><Link className="footer-link" to="/about">About</Link></li>
                            <li><Link className="footer-link" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col col3">
                        <ul className="list-footer">
                            <li className=""><h2 className="footer-headline">Have a Question?</h2></li>
                            <li><i className="fa fa-map-marker"></i><span className="footer-text"> 1 Ben-Gurion Ave, Beer-Sheva, Israel</span></li>
                            <li><i className="fa fa-phone"></i><span className="footer-text"> +972-8-646-1600</span></li>
                            <li><i className="fa fa-envelope"></i><span className="footer-text"> info@mytrip.com</span></li>
                        </ul>
                    </div>
                </div>
                <div className="social-footer">
                    <ul className="social-footer-list">
                        <li><a href="https://www.facebook.com/adi.nomberg" target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="https://twitter.com/adi_nomberg" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="https://github.com/adinomberg" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/adinomberg/" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
                <div className="copyright-footer">
                    <ul className="copyright-footer-list">
                        <li><i className="fa fa-copyright"></i> 2020 Copyright MyTrip</li>
                        <li>This website is made with <i className="fa fa-heart"></i> by Adi Nomberg</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Footer;
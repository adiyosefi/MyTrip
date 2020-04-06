import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <>
            <div class="container"></div>
            <div className="footer">
                <div className="main-footer">
                    <div className="footer-col col1">
                        <h2 className="footer-headline">MyTrip</h2>
                        <p> A free online trip planner that can help you build a personalized itinerary for your next vacation. </p>
                    </div>
                    <div className="footer-col col2">
                        <ul className="list-footer">
                            <li className=""><h2 className="footer-headline">Information</h2></li>
                            <li className=""><Link className="footer-link" to="/about">About</Link></li>
                            <li className=""><Link className="footer-link" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col col3">
                        <ul className="list-footer">
                            <li className=""><h2 className="footer-headline">Have a Question?</h2></li>
                            <li><i className="fa fa-map-marker"></i><span class="footer-text"> 1 Ben-Gurion Ave, Beer-Sheva, Israel</span></li>
                            <li><i className="fa fa-phone"></i><span class="footer-text"> +972-8-646-1600</span></li>
                            <li><i className="fa fa-envelope"></i><span class="footer-text"> info@mytrip.com</span></li>
                        </ul>
                    </div>
                </div>
                <div className="social-footer">
                    <ul class="social-footer-list">
                        <li><a href="https://www.facebook.com/adi.nomberg" target="_blank" rel="noopener noreferrer"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="https://twitter.com/adi_nomberg" target="_blank" rel="noopener noreferrer"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="https://github.com/adinomberg" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i></a></li>
                        <li><a href="https://www.linkedin.com/in/adinomberg/" target="_blank" rel="noopener noreferrer"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
                <div className="copyright-footer">
                    <ul className="copyright-footer-list">
                        <li><i className="fa fa-copyright"></i> 2020 Copyright MyTrip</li>
                        <li>This website is made with <i class="fa fa-heart"></i> by Adi Nomberg</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Footer;
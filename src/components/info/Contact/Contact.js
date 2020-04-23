import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Contact Us
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="first-para">
                    Need help? More information? Get in touch today and speak to our friendly team!
                </div>
                <div className="contact-para">
                    <i className="fa fa-large fa-phone"></i> <b>Phone:</b><span
                    className="phone">+972-8-646-1600</span>
                </div>
                <div className="contact-para">
                    <i className="fa fa-large fa-envelope"></i> <b>Email:</b><span
                    className="email">info@mytrip.com</span>
                </div>
                <div className="contact-para">
                    <i className="fa fa-large fa-map-marker"></i> <b>Address: </b>
                    <div className="address">1 Ben-Gurion Ave.,<br/>
                        Beer-Sheva 84105,<br/>
                        Israel
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
import React from 'react';
import '../styles/Contact.css';

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
                <p className="first-para">
                    Need help? More information? Get in touch today and speak to our friendly team!
                </p>
                <p>
                    <i className="fa fa-large fa-phone"></i> <b>Phone:</b><span
                    className="phone">+972-8-646-1600</span>
                </p>
                <p>
                    <i className="fa fa-large fa-envelope"></i> <b>Email:</b><span
                    className="email">info@mytrip.com</span>
                </p>
                <p>
                    <i className="fa fa-large fa-map-marker"></i> <b>Address: </b>
                    <div className="address">1 Ben-Gurion Ave.,<br/>
                        Beer-Sheva 84105,<br/>
                        Israel
                    </div>
                </p>
            </div>
        </div>
    );
};

export default Contact;
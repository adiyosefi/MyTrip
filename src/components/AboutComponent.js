import React from 'react';
import '../styles/About.css';

const About = () => {
    return (
        <div className="about">
            <div className="background">
                <div className="container">
                    <div className="title">
                        About Us
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="content-first-part">
                    <p>
                        MyTrip is a small startup, made of great personnel with passion for trips and adventures around the globe.<br/>
                        We believe that every person has unique qualities that define him/her, so their trips shouldn't be the same!
                    </p>
                    <p>
                        We made a free online trip planner that can help you build a personalized itinerary for your next vacation.<br/>
                        To plan with MyTrip, you tell it where you&apos;re going, your dates, and your sightseeing preferences. Within seconds, you'll receive a detailed list with trip routes, restaurants, attractions and more.
                    </p>
                    <p>
                        You can also create a custom activity on your calendar. You can name the restaurant you want to eat at for lunch, the hotel you want to sleep in, or another activity that you couldn't find in our database.<br/>
                        The software provides a complete set of tools and recommendations so you can research the destination and make any desired changes to the itinerary.
                    </p>
                    <p>
                        MyTrip's trip-planning features also include an easy and convenient system for building your equipment list. We will help you find a recommended equipment list for your needs, and you can also customize your own list.
                    </p>
                    <p>
                        If you have some important extra details you need to remember such as important phone numbers, transportation details, accommodation details, a link to another site with information about a custom activity, addresses, and much more, you can write everything down in your trip Notes.
                    </p>
                    <p>
                        Once you have settled on the itinerary and made your bookings, you can take your plan with you on the trip, and see it from anywhere you want! If you want to ask friends for advice on the itinerary, you can do so.<br/>
                        MyTrip makes vacation planning fast, fun, and easy!
                    </p>
                </div>

                <div className="content-second-part">
                    <h2>How does MyTrip work?</h2>
                    <p>
                        In order to start planning your trip, select a destination and the required dates.
                    </p>
                    <p>
                        You can add to your calender custom activities or search for desired activities on our site.<br/>
                        To search for activities you enter the search details and mark the activities you like from the search results. You can click on an activity to see its' details.<br/>
                        After you've marked the wanted activities you'll see them in your trip page.<br/>
                        Now you can drag activities from the favourite activities section to your calender.
                    </p>
                    <p>
                        If you want to make your own equipment list you type the items one by one to your list. If you want to get a recommended list you insert the search details and choose a list that suits your needs. <br/>
                        Once you chose a list you'll see it in your trip page.
                    </p>
                    <p>
                        To add notes to your trip just type your notes in the notes section in your trip page.
                    </p>
                    <p>
                        And now you can start your trip peacefully knowing you have all the details you need in one place!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
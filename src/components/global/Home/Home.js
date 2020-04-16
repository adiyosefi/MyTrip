import React from 'react';
import './Home.css';


const Home = () => {
    const onStartPlanning = () => {
        /*
        if(user){
            //plan trip
        } else {
            //open signin 
        }
        */
    }

    return (
        <div className="home">
            <div className="background">
                <div className="container">
                    <div className="title">
                        <h2 className="mytrip-title">Plan the trip
                            of your dreams</h2>
                        <p>MyTrip is the new way to plan your next trip!</p>
                    </div>
                    <div className="form-container">
                        <div className="form-title">
                            Itinerary Planner
                        </div>
                        <form>
                            <input list="destination-of-trip" className="destination-input" name="Destination of Trip" placeholder="Enter destination (Country)" />
                            <datalist id="destination-of-trip">
                                <option value="Worldwide" defaultValue></option>
                                <option value="Australia"></option>
                                <option value="Belgium"></option>
                                <option value="Canada"></option>
                                <option value="Denmark"></option>
                                <option value="Egypt"></option>
                                <option value="France"></option>
                                <option value="Greece"></option>
                                <option value="Hungary"></option>
                                <option value="Israel"></option>
                                <option value="Japan"></option>
                                <option value="Korea"></option>
                                <option value="Latvia"></option>
                                <option value="Mexico"></option>
                                <option value="New Zealand"></option>
                                <option value="Oman"></option>
                                <option value="Peru"></option>
                                <option value="Qatar"></option>
                                <option value="Russia"></option>
                                <option value="Spain"></option>
                                <option value="Tanzania"></option>
                                <option value="United States"></option>
                                <option value="Vietnam"></option>
                                <option value="Yemen"></option>
                                <option value="Zimbabwe"></option>&nbsp;
                            </datalist>
                            <div className="start-date">
                                <label htmlFor="start-date"> Start: </label>
                                <input id="start-date" type="date" className="start-date-input" />
                            </div>
                            <div className="end-date">
                                <label htmlFor="end-date"> End: </label>
                                <input id="end-date" type="date" className="end-date-input" />
                            </div>
                            <button type="submit" name="form-submit"
                                onClick={onStartPlanning}
                                className="form-button">Start planning your trip</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
import React, { useState, createContext, useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import EquipmentList from './EquipmentListComponent';
import Contact from './ContactComponent';
import EquipmentListSearch from './EquipmentListSearchComponent';
import MyTrip from './MyTripComponent';
import ActivitySearch from './ActivitySearchComponent';
import LoginModal from './LoginModalComponent';
import {modalContext} from '../context/modal';


const Main = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <modalContext.Provider value={setIsModalOpen}>
                <Header />
                {isModalOpen && <LoginModal /> }
            </modalContext.Provider>
            <Switch>
                <Route exact path="/home" component={() => <Home />} />
                <Route exact path="/about" component={() => <About />} />
                <Route path="/equipmentlistsearch" component={() => <EquipmentListSearch />} />
                <Route exact path="/equipmentlist" component={() => <EquipmentList />} />
                <Route path="/activitysearch" component={() => <ActivitySearch />} />
                <Route exact path="/contact" component={() => <Contact />} />
                <Route path="/mytrip" component={() => <MyTrip />} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
    );
};

export default Main;
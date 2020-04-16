import React, { useState, createContext, useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Header from './global/Header/Header';
import Footer from './global/Footer/Footer';
import Home from './global/Home/Home';
import About from './info/About/About';
import PrivateEquipmentList from './equipment/PrivateEquipmentList/PrivateEquipmentList';
import Contact from './info/Contact/Contact';
import EquipmentListSearch from './equipment/EquipmentListSearch/EquipmentListSearch';
import MyTrip from './private/MyTrip/MyTrip';
import ActivitySearch from './activity/ActivitySearch/ActivitySearch';
import LoginModal from './auth/LoginModal/LoginModal';
import { ModalProvider } from '../context/modal';
import SignIn from "./auth/SignIn/SignIn";
import SignUp from "./auth/SignUp/SignUp";
import PasswordReset from "./auth/PasswordReset/PasswordReset";
import {UserProvider} from '../context/user';
import PrivateRoute from './private/PrivateRoute';


const Main = (props) => {

    return (
        <>
            <UserProvider>
                <ModalProvider>
                    <Header />
                    <LoginModal />
                </ModalProvider>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/about" component={About} />
                    <Route path="/equipmentlistsearch" component={EquipmentListSearch} />
                    <Route exact path="/privateequipmentlist" component={PrivateEquipmentList} />
                    <Route path="/activitysearch" component={ActivitySearch} />
                    <Route exact path="/contact" component={Contact} />
                    <PrivateRoute path="/mytrip" component={MyTrip} />
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/passwordreset" component={PasswordReset} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </UserProvider>
        </>
    );
};

export default Main;
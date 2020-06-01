import React from 'react';
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
import SignInUp from './auth/SignInUp/SignInUp';
import {UserProvider} from '../context/user';
import PrivateRoute from './private/PrivateRoute';
import ActivityDetails from './activity/ActivityDetails/ActivityDetails'


const Main = () => {
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
                    <Route exact path="/equipmentlistsearch" component={EquipmentListSearch} />
                    <PrivateRoute exact path="/privateequipmentlist" component={PrivateEquipmentList} />
                    <Route exact path="/activities" component={ActivitySearch} />
                    <Route path="/activities/:activityId" component={ActivityDetails} />
                    <Route exact path="/contact" component={Contact} />
                    <PrivateRoute exact path="/mytrip" component={MyTrip}/>
                    <Route exact path="/signinup" component={SignInUp} />
                    <Redirect from="/" to="/home" />
                </Switch>
                <Footer />
            </UserProvider>
        </>
    );
};

export default Main;
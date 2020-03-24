import React from 'react';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import EquipmentList from './EquipmentListComponent';
import Contact from './ContactComponent';


const Main = (props) => {
    return (
        <div>
            <Header />
                    <Switch /*location={this.props.location}*/>
                        <Route exact path="/home" component={() => <Home/>} />
                        <Route exact path="/about" component={() => <About/>} />
                        <Route exact path="/equipmentlist" component={() => <EquipmentList/>} />
                        <Route exact path="/contact" component={() => <Contact/>} />
                        <Redirect to="/home" />
                    </Switch>
            <Footer />
        </div>
    );
};

export default Main;
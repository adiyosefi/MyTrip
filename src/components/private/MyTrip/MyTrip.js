import React, { useContext } from "react";
import { UserContext } from "../../../context/user";
import {auth} from "../../../server/firebase";
import './MyTrip.css';

const MyTrip = () => {
    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    return (
      <div className = "">
        <div className="">
          <div
            style={{
              background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "200px",
              width: "200px"
            }}
            className=""
          ></div>
          <div className = "">
          <h2 className = "">{displayName}</h2>
          <h3 className = "">{email}</h3>
          </div>
        </div>
        <button className="" onClick = {() => {auth.signOut()}}>Sign out</button>
      </div>
    ) 
  };

export default MyTrip;

     
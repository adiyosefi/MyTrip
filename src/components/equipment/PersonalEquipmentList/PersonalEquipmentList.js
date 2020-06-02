import React, {useCallback, useState, useContext} from 'react';
import './PersonalEquipmentList.css';
import { v4 as uuidv4 } from 'uuid';
import {UserContext} from './../../../context/user';


// HOOKS
import {usePersonalEquipmentList} from '../../../hooks/usePersonalEquipmentList';
import PersonalEquipmentListItems from "./PersonalEquipmentListItems";
import PersonalEquipmentListButtons from "./PersonalEquipmentListButtons";


const PersonalEquipmentList = () => {
    const {currentUser} = useContext(UserContext);

    const [items, setItems] = usePersonalEquipmentList(currentUser);

    const [labelstate, setLabel] = useState("");
    const [error, setError] = useState("");

    const handleClick = () => {
        if (labelstate !== "") {
            const newItem = {id: uuidv4(), label: labelstate, checked: false, onEditMode: false};
            setItems([
                ...items,
                newItem
            ]);
            setLabel("");
        }
    }

    const handleKeyUp = (e) => {
        if (labelstate !== "") {
            if (e.which === 13) {
                const newItem = {id: uuidv4(), label: labelstate, checked: false, onEditMode: false};
                setItems([
                    ...items,
                    newItem
                ]);
                setLabel("");
            }
        }
    }


    return (
        <div className="equipmentlist">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Create your own Equipment List
                    </div>
                    <div className="formcontainer">
                        <form className="elform" onSubmit={(e) => {
                            e.preventDefault();
                            handleClick(labelstate);
                        }}>
                            <input type="text" className="elforminput" onKeyUp={handleKeyUp} value={labelstate}
                                   onChange={e => setLabel(e.target.value)} placeholder="Item name..."/>
                            <button type="submit" className="elformbutton">Add to list</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="listcontainer">
                    <h4>My Equipment List</h4>
                    <PersonalEquipmentListItems items={items} setItems={setItems} user={currentUser}/>
                </div>
                <div className="listbuttonscontainer">
                    {items.length ?
                        <PersonalEquipmentListButtons items={items} user={currentUser} error={error} setError={setError}/>
                    :
                        null}
                </div>
            </div>
        </div>
    );
};

export default PersonalEquipmentList;
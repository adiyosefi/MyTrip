import React, {useCallback, useState, useContext} from 'react';
import './PrivateEquipmentList.css';
import { v4 as uuidv4 } from 'uuid';
import {UserContext} from './../../../context/user';


// HOOKS
import {usePrivateEquipmentList} from '../../../hooks/usePrivateEquipmentList';
import PrivateEquipmentListItems from "./PrivateEquipmentListItems";
import PrivateEquipmentListButtons from "./PrivateEquipmentListButtons";


const PrivateEquipmentList = () => {
    const {currentUser} = useContext(UserContext);

    const [items, setItems] = usePrivateEquipmentList(currentUser);

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
                    <PrivateEquipmentListItems items={items} setItems={setItems} user={currentUser}/>
                </div>
                <div className="listbuttonscontainer">
                    {items.length ?
                        <PrivateEquipmentListButtons items={items} user={currentUser} error={error} setError={setError}/>
                    :
                        null}
                </div>
            </div>
        </div>
    );
};

export default PrivateEquipmentList;
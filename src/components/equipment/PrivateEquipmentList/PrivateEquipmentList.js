import React, {useCallback, useState, useContext} from 'react';
import './PrivateEquipmentList.css';
import { v4 as uuidv4 } from 'uuid';
//import { } from './../../../server/firebase';
import {UserContext} from './../../../context/user';
import AddEquipmentListToDBForm from './../AddEquipmentListToDBForm/AddEquipmentListToDBForm'
import {addFavoriteEquipmentListToUserTrip} from './../../../server/firebase';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';


// HOOKS
import {usePrivateEquipmentList} from '../../../hooks/usePrivateEquipmentList';


const RenderListItems = ({items, setItems, user}) => {

    const [inputState, setInput] = useState("");

    const toggleChecked = useCallback(id => {
        setItems(items.map(item => ({
            ...item,
            checked: item.id === id ? !item.checked : item.checked
        })));
        //updateUserAddNewItems(user, items);
    }, [setItems, items]);

    const handleEdit = useCallback(id => {
        setItems(items.map(item => ({
            ...item,
            onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
        })));
        //updateUserAddNewItems(user, items);
    }, [setItems, items]);

    const handleRemove = (id) => {
        const newList = items.filter(item => item.id !== id);
        setItems(newList);
        //updateUserAddNewItems(user, items);
    };

    const handleInputChange = (e, id) => {
        if (inputState != "") {
            if (e.which === 13) {
                setItems(items.map(item => ({
                    ...item,
                    label: item.id === id ? e.target.value : item.label,
                    onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
                })));
                //updateUserAddNewItems(user, items);
                setInput("");
            }
        }
    }

    const listItems = items.map((item) => {
        return (
            <li key={item.id} className="equipmentlistitem">
                <div className="equipmentlistitemcontent">
                    <div className="pretty p-icon p-round">
                        <input type="checkbox" id={`check-item-${item.id}`} onClick={() => toggleChecked(item.id)}/>
                        <div className="state">
                            <i className="icon mdi mdi-check"></i>
                            <label></label>
                        </div>
                    </div>
                    <input type="text" value={inputState}
                           placeholder={item.label}
                           className={item.onEditMode ? 'showEditInput' : 'hideEditInput'}
                           onKeyUp={(e) => handleInputChange(e, item.id)}
                           onChange={e => setInput(e.target.value)} />
                    <label htmlFor={`check-item-${item.id}`} className={`${item.checked ? 'item-line-through' : 'item-none'}
                     ${item.onEditMode ? 'hideP' : 'showP'}`}>{item.label} </label>
                     <Tooltip title="Edit" arrow>
                    <button className={item.onEditMode ? 'hoverBtn' : 'editbtn'} onClick={
                        () => {handleEdit(item.id)}
                    }>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    </Tooltip>
                    <Tooltip title="Remove" arrow>
                    <button className="removebtn" onClick={
                        () => {handleRemove(item.id)}
                    }>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    </Tooltip>
                </div>
            </li>
        );
    });

    if (items) {
        return (
            <div>
                <ul className="equipmentlistlist">
                    {listItems}
                </ul>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
};

const ListButtons = ({items, user, error, setError}) => {
    const [isAddEquipmentListToDBFormOpen, setIsAddEquipmentListToDBFormOpen] = useState(false);

function toggleAddEquipmentListToDBForm() {
setIsAddEquipmentListToDBFormOpen(!isAddEquipmentListToDBFormOpen);
}

const handleSetFavoriteEquipmentList = async (event, user, items) => {
event.preventDefault();
console.log('entered handleSetFavoriteEquipmentList');
if (user.trip != null || user.trip) {
console.log('entered trip is not null');
try {
  await addFavoriteEquipmentListToUserTrip(user, items);
  console.log('trip updated');
  window.location.href = '/mytrip';
}
catch (error) {
  setError('Error creating trip');
}
} else {
    setError('Create trip first!');
    console.log("error need to create trip first-" , error);
    window.location.href = '/mytrip';
}
}
    return (
        <div className="buttons-container">
            <div className="set-as-fav-el-button">
            <Button variant="contained" color="secondary" style={{ width: 180, fontWeight: 'bold',
             fontSize: 14, fontFamily: 'Poppins, sans-serif', textTransform: 'none', borderRadius: '20px' }}
            onClick={e => handleSetFavoriteEquipmentList(e, user, items)}>
                Set as my favorite Equipment List
            </Button>
            </div>
                <button onClick={toggleAddEquipmentListToDBForm} 
                className={`${isAddEquipmentListToDBFormOpen ? 'open-add-to-el-db-button' : 'add-to-el-db-button'}`}>
                    {`${isAddEquipmentListToDBFormOpen ? 'Close' : 'Add to our Equipment Lists Database'}`}</button>
                <div>
                    {isAddEquipmentListToDBFormOpen && <AddEquipmentListToDBForm 
                    displayName={user.displayName}
                    equipmentList={items}
                     toggleAddEquipmentListToDBForm={toggleAddEquipmentListToDBForm}/>}
                </div>
        </div>
    );
}


const PrivateEquipmentList = () => {
    const user = useContext(UserContext);

    const [items, setItems] = usePrivateEquipmentList(user);

    const [labelstate, setLabel] = useState("");
    const [error, setError] = useState("");

    const handleClick = () => {
        if (labelstate != "") {
            const newItem = {id: uuidv4(), label: labelstate, checked: false, onEditMode: false};
            setItems([
                ...items,
                newItem
            ]);
            /*try {
                updateUserAddNewItems(user, items);
              }
              catch(error){
                setError('Error adding new item');
              }*/
            setLabel("");
        }
    }

    const handleKeyUp = (e) => {
        if (labelstate != "") {
            if (e.which === 13) {
                const newItem = {id: uuidv4(), label: labelstate, checked: false, onEditMode: false};
                setItems([
                    ...items,
                    newItem
                ]);
                /*try {
                    updateUserAddNewItems(user, items);
                  }
                  catch(error){
                    setError('Error adding new item');
                  }*/
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
                    <RenderListItems items={items} setItems={setItems} user={user}/>
                </div>
                <div className="listbuttonscontainer">
                {items.length ? <ListButtons items={items} user={user} error={error} setError={setError}/> : null}
                </div>
            </div>
        </div>
    );
};

export default PrivateEquipmentList;
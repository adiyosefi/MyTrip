import React, {useCallback, useState} from 'react';
import './MyTrip.css';
import Tooltip from "@material-ui/core/Tooltip";
import {Link} from "react-router-dom";

// HOOKS
import {useFavoriteEquipmentList} from "../../../hooks/useFavoriteEquipmentList";


const TripFavoriteEquipmentList = ({ user }) => {
    const [items, setItems] = useFavoriteEquipmentList(user);
    const [inputState, setInput] = useState("");

    const toggleChecked = useCallback(id => {
        setItems(items.map(item => ({
            ...item,
            checked: item.id === id ? !item.checked : item.checked
        })));
    }, [setItems, items]);

    const handleEdit = useCallback(id => {
        setItems(items.map(item => ({
            ...item,
            onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
        })));
    }, [setItems, items]);

    const handleRemove = (id) => {
        const newList = items.filter(item => item.id !== id);
        setItems(newList);
    };

    const handleInputChange = (e, id) => {
        if (inputState !== "") {
            if (e.which === 13) {
                setItems(items.map(item => ({
                    ...item,
                    label: item.id === id ? e.target.value : item.label,
                    onEditMode: item.id === id ? !item.onEditMode : item.onEditMode
                })));
                setInput("");
            }
        }
    }

    const listItems = items.map((item) => {
        return (
            <li key={item.id} className="equipmentlistitem">
                <div className="equipmentlistitemcontent">
                    <div className="pretty p-icon p-round">
                        <input type="checkbox" id={`check-item-${item.id}`} onClick={() => toggleChecked(item.id)} />
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
                            () => { handleEdit(item.id) }
                        }>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                    </Tooltip>
                    <Tooltip title="Remove" arrow>
                        <button className="removebtn" onClick={
                            () => { handleRemove(item.id) }
                        }>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                    </Tooltip>
                </div>
            </li>
        );
    });

    return (
        <div className="favoriteequipmentlist">
            <h4>My Equipment List</h4>
            {
                items.length !== 0 && (
                    <div className="favoriteequipmentlistcontainer">
                        <ul className="equipmentlistlist">
                            {listItems}
                        </ul>
                    </div>
                )
            }
            {
                items.length === 0 && (
                    <div className="no-items-content">
                        <div className="no-items-title">
                            No favorite equipment list yet...
                        </div>
                        <div className="no-items-link">
                            <Link to="/equipmentlistsearch" className="link-to-equipmentlists">CLICK HERE</Link> to search and add an equipment list
                        </div>
                        <div className="no-items-link">
                            <Link to="/privateequipmentlist" className="link-to-equipmentlists">CLICK HERE</Link> to create your own equipment list
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default TripFavoriteEquipmentList;
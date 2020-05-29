import React, {useCallback, useState} from 'react';
import '../styles/EquipmentList.css';
import { v4 as uuidv4 } from 'uuid';

// HOOKS
import {useItems} from '../shared/items.hooks';


const RenderListItems = ({items, setItems}) => {

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
        if (inputState != "") {
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
                    <label htmlFor={`check-item-${item.id}`} className={`${item.checked ? 'item-line-through' : 'item-none'} ${item.onEditMode ? 'hideP' : 'showP'}`}>{item.label} </label>
                    <button className={item.onEditMode ? 'hoverBtn' : 'editbtn'} onClick={
                        () => {handleEdit(item.id)}
                    }>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button className="removebtn" onClick={
                        () => {handleRemove(item.id)}
                    }>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </li>
        );
    });

    if (items != null) {
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


const EquipmentListComponent = () => {
    const [items, setItems] = useItems();

    const [labelstate, setLabel] = useState("");

    const handleClick = () => {
        if (labelstate != "") {
            setItems([
                ...items,
                {id: uuidv4(), label: labelstate, checked: false, onEditMode: false}
            ]);
            setLabel("");
        }
    }

    const handleKeyUp = (e) => {
        if (labelstate != "") {
            if (e.which === 13) {
                setItems([
                    ...items,
                    {id: uuidv4(), label: labelstate, checked: false, onEditMode: false}
                ]);
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
                            <input type="text" className="elforminput" onKeyUp={handleKeyUp} value={labelstate} onChange={e => setLabel(e.target.value)} placeholder="Item name..."/>
                            <button type="submit" className="elformbutton">Add to list</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="listcontainer">
                    <h4>My Equipment List</h4>
                    <RenderListItems items={items} setItems={setItems}/>
                </div>
            </div>
        </div>
    );
};

export default EquipmentListComponent;
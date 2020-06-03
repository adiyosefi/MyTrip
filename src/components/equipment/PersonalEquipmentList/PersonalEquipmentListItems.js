import React, {useCallback, useState} from 'react';
import './PersonalEquipmentList.css';
import Tooltip from "@material-ui/core/Tooltip";

const PersonalEquipmentListItems = ({items, setItems, user}) => {
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

export default PersonalEquipmentListItems;
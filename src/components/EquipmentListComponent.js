import React, {useCallback} from 'react';
import '../styles/EquipmentList.css';

// HOOKS
import {useItems} from '../shared/items.hooks';


const RenderListItems = ({items}) => {
    const listItems = items.map((item) => {
        return (
            <li key={item.id}>
                <div>
                    <p className={item.checked ? 'item-line-through' : 'item-none'}>{item.label}</p>
                </div>
            </li>
        );
    });

    if (items != null) {
        return (
            <div>
                <ul className="">
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

    const handleClick = useCallback(e => {
        if (e.target.value != null) {
            setItems([
                ...items,
                {id: items.length, label: e.target.value, checked: false}
            ]);
            e.target.value = '';
        }
    }, [setItems, items]);

    const handleKeyUp = useCallback(e => {
        if (e.which === 13) {
            setItems([
                ...items,
                {id: items.length, label: e.target.value, checked: false}
            ]);
            e.target.value = '';
        }
    }, [setItems, items]);

    return (
        <div className="equipmentlist">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Create your own Equipment List
                    </div>
                    <div className="formcontainer">
                        <form className="elform">
                            <input type="text" className="elforminput" onKeyUp={handleKeyUp} placeholder="Item name..."/>
                            <button type="submit" className="elformbutton" onClick={handleClick}>Add to list</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="listcontainer">
                <h4>My Equipment List</h4>
                <RenderListItems items={items}/>
            </div>
        </div>
    );
};

export default EquipmentListComponent;
import React, {useState} from 'react';
import './PersonalEquipmentList.css';
import {addFavoriteEquipmentListToUserTrip} from "../../../server/firebase";
import Button from "@material-ui/core/Button";
import AddEquipmentListToDBForm from "../AddEquipmentListToDBForm/AddEquipmentListToDBForm";


const PersonalEquipmentListButtons = ({items, user, error, setError}) => {
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
};

export default PersonalEquipmentListButtons;
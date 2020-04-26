import React, { useState } from "react";
import './AddEquipmentListToDBForm.css';
import { generatePublicEquipmentListDocument } from './../../../server/firebase';
import { countries } from './../../../server/countries';



export function AddEquipmentListToDBForm({ displayName, equipmentList, toggleAddEquipmentListToDBForm }) {
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "tripDestination") {
            setDestination(value);
        } else if (name === "season") {
            setSeason(value);
        } else if (name === "category") {
            setCategory(value);
        }
    };

    const createPublicEquipmentListToDB = (event, displayName, destination, season, category, equipmentList) => {
        event.preventDefault();
        if (destination && season && category && equipmentList) {
        try {
            generatePublicEquipmentListDocument(displayName, destination, season, category, equipmentList);
            console.log('list created successfully');
        }
        catch (error) {
            setError('Error generating public equipment list');
        }
    } else {
        setError('not all details filled');
    }

        setDestination("");
        setSeason("");
        setCategory("");
    };

    return (
        <div className="addequipmentlisttodbform">
            <form>
                <div>
                    <input list="destination-of-trip" className="destination-input"
                        onChange={event => onChangeHandler(event)}
                        name="tripDestination" id="tripDestination"
                        placeholder="Enter destination (Country)" />
                    <datalist id="destination-of-trip" className="destination-datalist">
                        <option value="Worldwide" selected></option>
                        {countries.map(country => {
                            return (
                                <option value={country.name} key={country.code}></option>
                            );
                        })}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="season" className=""> Season: </label>
                    <select id="season" name="season"
                        onChange={event => onChangeHandler(event)}>
                        <option value="All Year Round" selected>All Year Round</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="category" className=""> Category: </label>
                    <select id="category" name="category"
                        onChange={event => onChangeHandler(event)}>
                        <option value="All Categories" selected>All Categories</option>
                        <option value="Adventure trip">Adventure trip</option>
                        <option value="City trip">City trip</option>
                        <option value="Relaxing vacation">Relaxing Vacation</option>
                    </select>
                </div>
                <div>
          {error}
        </div>
                <div>
                    <button
                        className=""
                        onClick={event => {
                            createPublicEquipmentListToDB(event, displayName, destination, season, category, equipmentList);
                        }}>
                        Add Equipment List to our Database!</button>
                </div>
            </form>
            <div>
                <button onClick={toggleAddEquipmentListToDBForm}>CLOSE FORM</button>
            </div>
        </div>
    );
}

export default AddEquipmentListToDBForm;


import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EquipmentListSearch.css';
import { v4 as uuidv4 } from 'uuid';
import { searchPublicEquipmentListDocuments } from './../../../server/firebase';
import { countries } from './../../../server/countries';

const RenderEquipmentLists = ({ lists }) => {

    const listsItems = lists.map((list) => {
        return (
            <li key={list.id}>
                <ul className="resultequipmentlist">
                    <div className="equipmentlistcontent">
                        <h5>{list.data.displayName}'s Equipment List</h5>
                        <div>
                            Destination: {list.data.destination}
                        </div>
                        <div>
                            Season: {list.data.season}
                        </div>
                        <div>
                            Category: {list.data.category}
                        </div>
                        <div>
                            {
                                list.data.list.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            <div className="pretty p-icon p-round">
                                                <div className="state">
                                                    <i className="icon mdi mdi-check"></i>
                                    <span>{item.label}</span>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }

                </div>
                    </div>
                </ul>
            </li>
        );
    });

    if (lists) {              
        return (
            <div>
                <ul className="equipmentlistslist">
                    {listsItems}
                </ul>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
    
}




const EquipmentListSearch = () => {
    const [destination, setDestination] = useState("");
    const [season, setSeason] = useState("");
    const [category, setCategory] = useState("");
    const [error, setError] = useState(null);

    const [resultsLists, setResultLists] = useState("");

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

    const searchPublicEquipmentListDB = async (event, destination, season, category, setResultLists) => {
        event.preventDefault();
        try {
            const equipmentListsResults = await searchPublicEquipmentListDocuments(destination, season, category);
            setResultLists(equipmentListsResults);
        }
        catch (error) {
            setError('Error searching public equipment lists');
        }

        setDestination("");
        setSeason("");
        setCategory("");
    };

    return (
        <div className="equipmentlistsearch">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Search an Equipment List
                    </div>
                    <div className="formcontainer">
                        <form className="el-search-form"
                        onSubmit={event => {
                            searchPublicEquipmentListDB(event, destination, season, category, setResultLists);
                        }}>
                            <div className="search-line">
                                <input list="destination-of-trip" className="destination-input"
                                    onChange={event => onChangeHandler(event)}
                                    name="tripDestination" id="tripDestination"
                                    placeholder="Enter destination (Country)" />
                                <datalist id="destination-of-trip" className="destination-datalist">
                                    <option value="Worldwide" defaultValue></option>
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
                                    <option value="All Year Round" defaultValue>All Year Round</option>
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
                                    <option value="All Categories" defaultValue>All Categories</option>
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
                                    type="submit">
                                    Search</button>
                            </div>
                        </form>
                        <div className="goto-ownlist">
                            Have your own list? Add it <Link className="goto-ownlist-link" to="/privateequipmentlist"> Here </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                <div className="listcontainer">
                    <h4>Search Results</h4>
                    {resultsLists && <RenderEquipmentLists lists={resultsLists} />}
                </div>
            </div>
        </div>
    );
};

export default EquipmentListSearch;
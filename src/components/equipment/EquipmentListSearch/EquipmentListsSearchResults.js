import React, {useState} from 'react';
import './EquipmentListSearch.css';
import {addFavoriteEquipmentListToUserTrip} from "../../../server/firebase";
import _ from "underscore";
import Button from "@material-ui/core/Button";
import {Pagination} from "@material-ui/lab";

const EquipmentListsSearchResults = ({ lists, user, trip }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const [favListError, setFavListError] = useState([]);
    const [favListSuccess, setFavListSuccess] = useState([]);

    const numberOfListsPerPage = 10;

    const numberOfPages = Math.ceil(lists.length / numberOfListsPerPage);

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastList = currentPage * numberOfListsPerPage;
    const indexOfFirstList = indexOfLastList - numberOfListsPerPage;
    const currentLists = lists.slice(indexOfFirstList, indexOfLastList);


    const handleSetFavoriteEquipmentList = async (event, user, items, listId) => {
        event.preventDefault();
        console.log('entered handleSetFavoriteEquipmentList');
        if (trip != null || trip) {
            console.log('entered trip is not null');
            try {
                await addFavoriteEquipmentListToUserTrip(user, items);
                console.log('trip updated');
                const newFavSuccess = favListSuccess.slice() //copy the array
                newFavSuccess[listId] = 'List added to your trip successfully!' //execute the manipulations
                setFavListSuccess(newFavSuccess);
                console.log('fav success:',favListSuccess[listId]);
                window.location.href = '/mytrip';
            }
            catch (favListError) {
                const newFaveError = favListError.slice();
                newFaveError[listId] = 'Error creating adding list to trip';
                setFavListError(newFaveError);
            }
        } else {
            const newFaveError = favListError.slice();
            newFaveError[listId] = 'Create trip first!';
            setFavListError(newFaveError);
            console.log("error need to create trip first-", favListError[listId]);
            window.location.href = '/mytrip';
        }
    }

    const listsItems = currentLists.map((list) => {
        const eachListItems = list.data.list.map((item) => {
            return (
                <li key={item.id} className="equipmentlistitem">
                    <div className="equipmentlistitemcontent">
                        <div className="pretty p-icon p-round">
                            <div className="state">
                                <i className="icon mdi mdi-check"></i>
                                <span>{item.label}</span>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div key={list.id} className="each-list-and-button">
                <div className="listcontainer">
                    <li key={list.id}>
                        <ul className="resultequipmentlist">
                            <div className="equipmentlistcontent">
                                <div className="list-title">
                                    <h5>{list.data.displayName}'s Equipment List</h5>
                                </div>
                                <div className="list-metadata">
                                    <div className="list-destination">
                                        <i className="fa fa-large fa-plane"></i> <span>Destination:</span> {list.data.destination}
                                    </div>
                                    <div className="list-season-and-category">
                                        <div className="list-season">
                                            <i className="fa fa-large fa-cloud"></i> <span>Season:</span> {list.data.season ? list.data.season : 'All year round'}
                                        </div>
                                        <div className="list-category">
                                            <i className="fa fa-large fa-list-ul"></i> <span>Category:</span> {list.data.category ? list.data.category : 'All categories'}
                                        </div>
                                    </div>
                                </div>
                                <div className="equipmentlist-container">
                                    <div className="equipmentlistlist">
                                        <ul>
                                            {eachListItems}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </li>
                </div>
                <div className="fav-list-button">
                    {!_.isEmpty(user) &&
                    <div>
                        <Button variant="contained" color="secondary" style={{ width: 160, textTransform: 'none', fontWeight: 'bold', fontSize: 14, borderRadius: '20px' }}
                                onClick={e => handleSetFavoriteEquipmentList(e, user, list.data.list, list.id)}>
                            Set as my favorite Equipment List
                        </Button>
                        {favListSuccess[list.id] &&
                        <div className="list-success-message">
                            <i className="fa fa-check-circle"></i> {favListSuccess[list.id]}
                        </div>
                        }
                        {favListError[list.id] &&
                        <div className="list-error-message">
                            <i className="fa fa-exclamation-circle"></i> {favListError[list.id]}
                        </div>
                        }
                    </div>
                    }
                </div>
            </div>
        );
    });

    return (
        <div className="lists-search-results">
            <ul className="equipmentlistslist">
                {listsItems}
            </ul>
            <div className="pagination-component">
                <Pagination className="MuiPagination-root" count={numberOfPages} onChange={handleChange} page={currentPage}
                            showFirstButton showLastButton />
            </div>
        </div>
    );
}

export default EquipmentListsSearchResults;
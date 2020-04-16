import React, {useCallback, useState} from 'react';
import './EquipmentListSearch.css';
import { v4 as uuidv4 } from 'uuid';

// HOOKS
import {useItems} from '../../../hooks/useItems';


const EquipmentListSearch = () => {
    

    return (
        <div className="equipmentlistsearch">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Search Equipment List
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                
            </div>
        </div>
    );
};

export default EquipmentListSearch;
import React, {useCallback, useState} from 'react';
import './ActivitySearch.css';
import { v4 as uuidv4 } from 'uuid';

// HOOKS
import {useItems} from '../../../hooks/useItems';


const ActivitySearch = () => {
    

    return (
        <div className="activitysearch">
            <div className="background">
                <div className="container">
                    <div className="title">
                        Search Activity
                    </div>
                </div>
            </div>
            <div className="contentcontainer">
                
            </div>
        </div>
    );
};

export default ActivitySearch;
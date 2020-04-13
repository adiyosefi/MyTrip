import {useState, useEffect, useCallback} from 'react';
import {values} from 'lodash/fp';
import {database} from '../server/firebase';

export const useItems = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        database.ref('/items').on('value', snapshot => {
            setState(values(snapshot.val()));
        });

        return () => database.ref('/items').off();
    }, []);

    const syncItems = useCallback(data => {
        database.ref('/items').set(data);
    }, []);

    return [state, syncItems];
};

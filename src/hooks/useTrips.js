import {useState, useEffect, useCallback} from 'react';
import {values} from 'lodash/fp';
import {database} from '../server/firebase';

export const useTrips = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        database.ref('/trips').on('value', snapshot => {
            setState(values(snapshot.val()));
        });

        return () => database.ref('/trips').off();
    }, []);

    const syncTrips = useCallback(data => {
        database.ref('/trips').set(data);
    }, []);

    return [state, syncTrips];
};

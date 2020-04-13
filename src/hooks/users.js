import {useState, useEffect, useCallback} from 'react';
import {values} from 'lodash/fp';
import {database} from '../server/firebase';

export const useUsers = () => {
    const [state, setState] = useState([]);

    useEffect(() => {
        database.ref('/users').on('value', snapshot => {
            setState(values(snapshot.val()));
        });

        return () => database.ref('/users').off();
    }, []);

    const syncUsers = useCallback(data => {
        database.ref('/users').set(data);
    }, []);

    return [state, syncUsers];
};

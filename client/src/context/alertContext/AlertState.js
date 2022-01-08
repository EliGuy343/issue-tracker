import React, { useReducer } from 'react'; 
import {v4 as uuidv4} from 'uuid';
import alertContext from './alertContext';
import alertReducer from './alertReducer'; 

import {
    SET_ALERT,
    REMOVE_ALERT,
    SET_WINDOW_ALERT,
    REMOVE_WINDOW_ALERT
} from '../types'; 

const AlertState = props => {
    const initialState = {
        alerts:[],
        windowAlerts :[]
    };

    const [state, dispatch] = useReducer(alertReducer,initialState);

    const setAlert = (msg, type, timeout = 5000) => {
        const id = uuidv4(); 
        dispatch({type:SET_ALERT, payload:{msg, type, id}});
       
        setTimeout(() => dispatch({type:REMOVE_ALERT, payload: id}), timeout); 


    }

    const setWindowAlert = (msg, type, timeout = 5000) => {
        const id = uuidv4(); 
        dispatch({type:SET_WINDOW_ALERT, payload:{msg, type, id}});
       
        setTimeout(() => dispatch({type:REMOVE_WINDOW_ALERT, payload: id}), timeout); 


    }
    return (
        <alertContext.Provider 
            value ={{
                alerts: state.alerts,
                windowAlerts: state.windowAlerts,
                setAlert,
                setWindowAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
};


export default AlertState;

import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import fixContext from './fixContext';
import fixReducer from './fixReducer';
import axios from 'axios';

import {
    ADD_FIX,
    DELETE_FIX,
    UPDATE_FIX
} from '../types'


const FixState = props => {
    const initialState = {
        fixes: {
            '1': {
                id:'25011890',
                user:'618c0a5a607433ccb320892f',
                userName:"Jack Dickson",
                solution:"Rewrote authentication backend",
                date:  Date(Date.now()).toString()
            }
            
        }
    }
    const addFix = (fix, issueId) => {
        fix.id = uuidv4();
        fix.date = Date(Date.now()).toString();  
        const newFix = [issueId,fix];
        dispatch({type: ADD_FIX, payload: newFix});
    }

    const deleteFix = id => {
        dispatch({type: DELETE_FIX, payload: id}); 
    }

    const updateFix = (fix,issueId) => {
        fix.id = uuidv4(); 
        fix.date = Date(Date.now()).toString(); 
        const updatedFix = [issueId,fix]; 
        dispatch({type:UPDATE_FIX, payload: updatedFix}); 
    }
    const [state, dispatch] = useReducer(fixReducer, initialState);

    return (
        <fixContext.Provider value={{
            fixes: state.fixes,
            addFix,
            deleteFix,
            updateFix
        }}>
            {props.children}
        </fixContext.Provider>
    )
}

export default FixState;
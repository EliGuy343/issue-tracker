import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import fixContext from './fixContext';
import fixReducer from './fixReducer';
import axios from 'axios';

import {
    ADD_FIX,
    DELETE_FIX,
    SET_CURRENT_ISSUE,
    CLEAR_CURRENT_ISSUE,
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
                date: Date.now()
            }
            
        }
    }
    const addFix = (fix, issueId) => {
        fix.id = uuidv4(); 
        const newFix = [issueId,fix];
        dispatch({type: ADD_FIX, payload: newFix});
    }


    const [state, dispatch] = useReducer(fixReducer, initialState);

    return (
        <fixContext.Provider value={{
            fixes: state.fixes,
            addFix
        }}>
            {props.children}
        </fixContext.Provider>
    )
}

export default FixState;
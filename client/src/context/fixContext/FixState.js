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
        fixes: [
            {
                id:120540672034,
                user:'618c0a5a607433ccb320892f',
                userName:"Jack Dickson",
                issue:"1",
                solution:"Reworte authentication backend",
                date: Date.now
            }
        ]
    }

    const [state, dispatch] = useReducer(fixReducer, initialState);

    return (
        <fixContext.Provider value={{
            fixes: state.fixes
        }}>
            {props.children}
        </fixContext.Provider>
    )
}

export default FixState;
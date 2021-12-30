import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import fixContext from './fixContext';
import fixReducer from './fixReducer';
import axios from 'axios';

import {
    ADD_FIX,
    DELETE_FIX,
    UPDATE_FIX,
    FIX_ERROR,
    GET_FIXES,
    SET_LOADING
} from '../types'


const FixState = props => {
    const initialState = {
        fixes: {},
        loading:false
    }

    const getFixes = async () => {
        dispatch({type:SET_LOADING, payload:null});
       try {
            
            const res = await axios.get('/api/fixes');
            const newFixes = {} 
            debugger; 
            for(let i = 0;  i < res.data.length; i++){
                newFixes[res.data[i].issue] = res.data[i]; 
            }
            dispatch({type:GET_FIXES,payload: newFixes});

       } catch (error) {
            dispatch({type:FIX_ERROR, payload:error.response.msg});    
       }
    }
    const addFix = async (fix, issueId) => {
        
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        try {   
            const res = await axios.post('/api/fixes',{issue:issueId, solution:fix.solution}, config);
            const newFix = [issueId,res.data];
            dispatch({type: ADD_FIX, payload: newFix});
        }
        catch (error) {
            dispatch({type:FIX_ERROR, payload: error.response.msg});
            debugger;
        }   
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
            updateFix,
            getFixes,
            loading: state.loading
        }}>
            {props.children}
        </fixContext.Provider>
    )
}

export default FixState;
import React, { useReducer } from 'react';

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

    const deleteFix = async id => {
        try {

            await axios.delete(`/api/fixes/${state.fixes[id]._id}`);
            dispatch({type: DELETE_FIX, payload: id}); 
            
        } catch (error) {
            dispatch({type:FIX_ERROR, payload: error.response.msg});
        }
    }

    const updateFix = async (fix,issueId) => {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        try {   
            await axios.put(`/api/fixes/${fix.id}`,{issue:issueId, solution:fix.solution}, config);
            const updatedFix = [issueId,fix]; 
            dispatch({type:UPDATE_FIX, payload: updatedFix}); 

        }
        catch (error) {
            dispatch({type:FIX_ERROR, payload: error.response.msg});
            debugger;
        }   
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
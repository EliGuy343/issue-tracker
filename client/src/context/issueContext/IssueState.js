import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import issueContext from './issueContext';
import issueReducer from './issueReducer';
import axios from 'axios'; 

import {
    ADD_ISSUE,
    DELETE_ISSUE,
    UPDATE_ISSUE,
    FILTER_ISSUES,
    CLEAR_FILTER,
    ISSUE_ERROR,
    GET_ISSUES,
    CLEAR_ISSUES
} from '../types'

const IssueState = props => {
    const initialState = {
        issues : [],
        filtered:null,
        error:null
    }

    const getAllIssues = async () => {
        try {
            const res = await axios.get('/api/issues'); 
            dispatch({type: GET_ISSUES, payload: res.data}); 
        } catch (error) {
            dispatch({type: ISSUE_ERROR, payload:error.response.msg}); 
        }
    }

    const getUserIssues = async () => {
        try {
            const res = await axios.get('/api/issues/user'); 
            dispatch({type: GET_ISSUES, payload: res.data}); 
        } catch (error) {
            dispatch({type: ISSUE_ERROR, payload:error.response.msg}); 
        }
    }

    const addIssue = async issue => {
        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };
        try {
            const res = await axios.post('/api/issues', issue, config);
            dispatch({type: ADD_ISSUE, payload: res.data});
        } catch (error) {
            dispatch({type:ISSUE_ERROR, payload:error.response.msg });
        }
    }

    const deleteIssue = id => {
        dispatch({type: DELETE_ISSUE, payload:id}); 
    }
    const updateIssue = issue => {
        dispatch({type:UPDATE_ISSUE, payload:issue}); 
    }

    const filterIssues = text => {
        dispatch({type:FILTER_ISSUES, payload: text}); 
    }; 
    const clearFilter = () => {
        dispatch({type:CLEAR_FILTER});
    }
    const [state, dispatch] = useReducer(issueReducer, initialState); 

    return (
        <issueContext.Provider
        value={{
            issues: state.issues,
            filtered: state.filtered,
            error:state.error,
            addIssue,
            deleteIssue,
            updateIssue,
            filterIssues,
            clearFilter,
            getAllIssues,
            getUserIssues
        }}>
            {props.children}
        </issueContext.Provider>
    )
}


export default IssueState; 
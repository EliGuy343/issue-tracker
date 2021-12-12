import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import issueContext from './issueContext';
import issueReducer from './issueReducer';
import axios from 'axios'; 

import {
    ADD_ISSUE,
    DELETE_ISSUE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ISSUE,
    FILTER_ISSUES,
    CLEAR_FILTER,
} from '../types'

const IssueState = props => {
    const initialState = {
        issues : [
            {   
                id:'1',
                user:'618c0a5a607433ccb320892f',
                userName:'Jack Dickson',
                name:`register fails on regular login`,
                category:"authentication",
                date: Date(Date.now()).toString()
                
            },
            {
                id:'2',
                user:'618c0a5a607433ccb320892f',
                userName:'Jack Dickson',
                name:`solution components don't load`,
                category:"UI",
                date: Date(Date.now()).toString()
            }
        ]
    }

    const addIssue = issue => {
        issue.id = uuidv4();
        issue.date = Date(Date.now()).toString() 
        dispatch({ type: ADD_ISSUE, payload: issue});
    }

    const [state, dispatch] = useReducer(issueReducer, initialState); 

    return (
        <issueContext.Provider
        value={{
            issues: state.issues,
            addIssue
        }}>
            {props.children}
        </issueContext.Provider>
    )
}


export default IssueState; 
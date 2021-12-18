import React, {useReducer} from 'react'
import {v4 as uuidv4} from 'uuid';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const AuthState = props => {

    const initialState = {
        token:localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error:null
    };


    const [state, dispatch] = useReducer(authReducer, initialState); 

    return (
        <authContext.Provider 
        value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                user:state.user,
                loading:state.loading,
                error:state.error
            }}
        > 
        {props.children}
        </authContext.Provider>
    )

}

export default AuthState; 
import React, {useReducer} from 'react'
import {v4 as uuidv4} from 'uuid';
import authContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';



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
    
    

    const register = async formdata => {
        const config = {
            Headers:{
                'Content-Type':'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formdata, config);
            console.log(res);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            }); 
            loadUser(); 
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            }); 
        }
    }
    
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token); 
        }


        try {
            const res = await axios.get('/api/auth'); 
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch (error) {
            console.log(error.response.data.msg); 
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    const clearErrors = () => dispatch({
        type: CLEAR_ERRORS
    });

    return (
        <authContext.Provider 
        value={{
                token:state.token,
                isAuthenticated:state.isAuthenticated,
                user:state.user,
                loading:state.loading,
                error:state.error,
                register,
                clearErrors,
                loadUser
            }}
        > 
        {props.children}
        </authContext.Provider>
    )

}

export default AuthState; 
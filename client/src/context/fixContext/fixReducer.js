import {
    ADD_FIX,
    DELETE_FIX,
    UPDATE_FIX,
    FIX_ERROR,
    GET_FIXES,
    SET_LOADING
} from '../types'
 // eslint-disable-next-line
export default (state, action) => {

    switch(action.type) {
        case UPDATE_FIX:
        case ADD_FIX:
            return {
                ...state,
                fixes:{
                    ...state.fixes,
                    [action.payload[0]]:action.payload[1]
                },
                loading:false
            };
        case DELETE_FIX: 
            const newFixes =  state.fixes;
            delete newFixes[action.payload];  
            return {
                ...state, 
                fixes:newFixes,
                loading:false
            };
        case FIX_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false
            };
        case GET_FIXES:
            return {
                ...state,
                fixes:action.payload,
                loading:false
            };
        case SET_LOADING:
            return {
                ...state,
                loading:true
            };
        default:
            return state; 
    }
}
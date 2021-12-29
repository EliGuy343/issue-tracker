import {
    ADD_FIX,
    DELETE_FIX,
    UPDATE_FIX,
    FIX_ERROR
} from '../types'

export default (state, action) => {

    switch(action.type) {
        case UPDATE_FIX:
        case ADD_FIX:
            return {
                ...state,
                fixes:{
                    ...state.fixes,
                    [action.payload[0]]:action.payload[1]
                }
            };
        case DELETE_FIX: 
            const newFixes =  state.fixes;
            delete newFixes[action.payload];  
            return {
                ...state, 
                fixes:newFixes
            };
        case FIX_ERROR:
            return {
                ...state,
                error:action.payload
            };
        default:
            return state; 
    }
}
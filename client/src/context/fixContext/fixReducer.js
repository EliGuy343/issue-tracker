import {
    ADD_FIX,
    DELETE_FIX,
    SET_CURRENT_ISSUE,
    CLEAR_CURRENT_ISSUE,
    UPDATE_FIX
} from '../types'

export default (state, action) => {

    switch(action.type) {

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
        case UPDATE_FIX:
            return {
                ...state,
                fixes:{
                    ...state.fixes,
                    [action.payload[0]]:action.payload[1]
                }
            }; 
        default:
            return state; 
    }
}
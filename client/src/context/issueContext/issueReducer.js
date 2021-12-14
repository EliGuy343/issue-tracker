import {
    ADD_ISSUE,
    DELETE_ISSUE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_ISSUE,
    FILTER_ISSUES,
    CLEAR_FILTER,
} from '../types'

export default (state, action) => {

    switch(action.type) {

        case ADD_ISSUE:
            return {
                ...state,
                issues:[...state.issues, action.payload]
            }
        case DELETE_ISSUE:
            return {
                ...state, 
                issues: state.issues.filter(issue => issue.id !== action.payload)
            };
        case UPDATE_ISSUE:
            return {
                ...state, 
                issues: state.issues.map(issue => issue.id === action.payload.id ? action.payload : issue)
            };
        default:
            return state; 
    }
}
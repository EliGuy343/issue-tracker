import {
    ADD_ISSUE,
    DELETE_ISSUE,
    UPDATE_ISSUE,
    FILTER_ISSUES,
    CLEAR_FILTER,
    ISSUE_ERROR,
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
        case FILTER_ISSUES:
            let regexText = action.payload
            if(regexText.charAt(regexText.length - 1) === `\\`) {
                regexText = regexText.concat(" ");
            }
            return {
                ...state, 
                filtered: state.issues.filter(issue => {
                    const regex = new RegExp(`${regexText}`, 'gi');
                    return issue.name.match(regex);
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case ISSUE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state; 
    }
}
import {
    ADD_ISSUE,
    DELETE_ISSUE,
    UPDATE_ISSUE,
    FILTER_ISSUES,
    CLEAR_FILTER,
    ISSUE_ERROR,
    GET_ISSUES,
    CLEAR_ISSUES,
    SET_LOADING
} from '../types'
// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {

        case GET_ISSUES:
            return {
                ...state,
                issues:action.payload,
                loading:false
            };

        case ADD_ISSUE:
            return {
                ...state,
                issues:[...state.issues, action.payload],
                loading:false
            };
        case DELETE_ISSUE:
            return {
                ...state,
                issues: state.issues.filter(issue => issue._id !== action.payload),
                loading:false
            };
        case UPDATE_ISSUE:
            return {
                ...state,
                issues: state.issues.map(issue => issue._id === action.payload._id ? action.payload : issue),
                loading:false
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
                }),
                loading:false
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered:null
            }
        case ISSUE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading:false
            }
        case SET_LOADING:
            return {
                ...state,
                loading:true
            }
        case CLEAR_ISSUES:
            return {
                ...state,
                issues:[],
                filtered:null,
                loading:false,
            }
        default:
            return state;
    }
}
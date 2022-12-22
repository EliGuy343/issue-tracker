import { 
    SET_ALERT,
    REMOVE_ALERT,
    SET_WINDOW_ALERT,
    REMOVE_WINDOW_ALERT
} from "../types";

 // eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {

        case SET_ALERT:
            return {
                ...state,
                alerts:[...state.alerts, action.payload]
            };
        case SET_WINDOW_ALERT:
            return {
                ...state,
                windowAlerts:[...state.windowAlerts, action.payload]
            };
        case REMOVE_ALERT:

            return {
                ...state,
                alerts:state.alerts.filter(alert => alert.id !== action.payload)
            };
        case REMOVE_WINDOW_ALERT:
            return {
                ...state,
                windowAlerts:state.windowAlerts.filter(alert => alert.id !== action.payload)
            }
        default:
            return state;

        }
}
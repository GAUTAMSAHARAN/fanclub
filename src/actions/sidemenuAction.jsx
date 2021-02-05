import {
    ACTIVE_ELEMENT,
} from './sidemenuActionType';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType, 
        payload: data,
    };
};

export const setActiveElement = (id) => {
    return dispatch => {
        dispatch(apiDispatch(ACTIVE_ELEMENT, id));  
    }
}
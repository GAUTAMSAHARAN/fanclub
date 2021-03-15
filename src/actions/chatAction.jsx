import apiClient from  '../config/apiClient';

import {
    SHOW_OR_HIDE_MEMBERS_LIST,
    GET_CHAT_ERROR,
} from './chatActionType';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: GET_CHAT_ERROR,
        error
    }
}


export const showMembers = (data) => {
    return dispatch => {
        dispatch(apiDispatch(SHOW_OR_HIDE_MEMBERS_LIST, data));
    }
}
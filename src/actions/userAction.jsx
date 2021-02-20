import apiClient from '../config/apiClient';

import {
    PATCH_BIO,
    PATCH_PHONE,
    PATCH_USERNAME,
    GET_USER_ERROR,
    CHANGE_PHONE_PENDING, 
    CHANGE_USERNAME_PENDING, 
    CHANGE_BIO_PENDING,
    GET_USER,
    GET_USER_PENDING,
} from './userActionType';

import {

} from '../config/urls';

const apiDispatch = (actionType = '', data) => {
    return {
        type: actionType,
        payload: data,
    };
};

const apiError = error => {
    return {
        type: GET_USER_ERROR,
        error
    }
}

export const getUser = () => {
    let url = '';
    return dispatch => {
        dispatch(GET_USER_PENDING, true);
        apiClient
            .get(url)
            .then(res => {
                dispatch(apiDispatch(GET_USER, res.data));
                dispatch(apiDispatch(GET_USER_PENDING, false));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const changeUsername = (username) => {
    let url = '';
    return dispatch => {
        dispatch(apiDispatch(CHANGE_USERNAME_PENDING, true));
        apiClient
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_USERNAME, username));
                dispatch(apiDispatch(CHANGE_USERNAME_PENDING), false);
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const changePhone = (phone) => {
    let url = '';
    return dispatch => {
        dispatch(apiDispatch(CHANGE_PHONE_PENDING, true));
        apiClient 
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_PHONE, phone));
                dispatch(apiDispatch(CHANGE_PHONE_PENDING, false));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const changeBio = (bio) => {
    let url = '';
    return dispatch => {
        dispatch(apiDispatch(CHANGE_BIO_PENDING, true));
        apiClient 
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_BIO, bio));
                dispatch(apiDispatch(CHANGE_PHONE_PENDING, false));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}
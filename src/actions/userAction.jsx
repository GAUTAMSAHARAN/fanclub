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
    LOGIN_PENDING,
    SET_TOKEN,
    LOGIN_BOOL,
    CREATE_USER_PENDING,
    LOGGEDINORNOT,
    SET_ID,
} from './userActionType';

import {
    update_user,
    login,
    registration,
    googleLogin,
    facebookLogin,
    get_user,
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
    let url = get_user;
    return (dispatch) => {
        dispatch(apiDispatch(GET_USER_PENDING, true));
        apiClient
            .get(url)
            .then(res => {
                console.log(res);
                dispatch(apiDispatch(GET_USER, res.data));
                dispatch(apiDispatch(SET_ID, res.data.pk));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
        dispatch(apiDispatch(GET_USER_PENDING, false));
    }
}

export const changeUsername = (username) => {
    let url = update_user;
    return dispatch => {
        dispatch(apiDispatch(CHANGE_USERNAME_PENDING, true));
        apiClient
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_USERNAME, username));
                dispatch(apiDispatch(CHANGE_USERNAME_PENDING), false);
            })
            .catch(error => {
                console.log('error')
                dispatch(apiError(error));
            })
    }
}

export const changePhone = (phone) => {
    let url = update_user;
    return dispatch => {
        dispatch(apiDispatch(CHANGE_PHONE_PENDING, true));
        apiClient 
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_PHONE, phone));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
        dispatch(apiDispatch(CHANGE_PHONE_PENDING, false));
    }
}

export const changeBio = (bio) => {
    let url = update_user;
    return dispatch => {
        dispatch(apiDispatch(CHANGE_BIO_PENDING, true));
        apiClient 
            .patch(url)
            .then(res => {
                dispatch(apiDispatch(PATCH_BIO, bio));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
        dispatch(apiDispatch(CHANGE_PHONE_PENDING, false));
    }
}


export const loginUser = (data) => {
    let url = login;
    return dispatch => {
        dispatch(apiDispatch(LOGIN_PENDING, true));
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
                dispatch(apiDispatch(LOGIN_PENDING, false));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const formSwticher = (data) => {
    return  dispatch => {
        dispatch(apiDispatch(LOGIN_BOOL, data));
    }
}

export const createUser = (data) => {
    let url = registration;
    return dispatch => {
        dispatch(apiDispatch(CREATE_USER_PENDING, true));
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
            dispatch(apiDispatch(CREATE_USER_PENDING, false));
    }
}

export const GoogleLoginFtn = (data) => {
    let url = googleLogin;
    return dispatch => {
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}

export const FacebookLoginFtn = (data) => {
    let url = facebookLogin;
    return dispatch => {
        apiClient
            .post(url, data)
            .then(res => {
                dispatch(apiDispatch(SET_TOKEN, res.data.key));
                dispatch(apiDispatch(LOGGEDINORNOT, true));
            })
            .catch(error => {
                dispatch(apiError(error));
            })
    }
}


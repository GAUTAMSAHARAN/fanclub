import update from 'react-addons-update';

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
    LOGGEDINORNOT,
    SET_ID,
} from '../actions/userActionType';

const initialPendingState = {
    getUserPending: false,
    changeUsernamePending: false,
    changePhonePending: false,
    changeBioPending: false,
    loginPending: false,
}

const initialState = {
    ...initialPendingState,
    _id: null,
    user: [],
    token: '',
    loggedIn: false,
    logbool: true,
}

export default function userReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
        case SET_TOKEN:
            return {...state, token: payload}
        case LOGGEDINORNOT:
            return {...state, loggedIn: payload}
        case LOGIN_BOOL:
            return {...state, logbool: payload}
        case CHANGE_USERNAME_PENDING:
            return {...state, changeUsernamePending: payload}
        case CHANGE_BIO_PENDING:
            return {...state, changeBioPending: payload}
        case CHANGE_PHONE_PENDING:
            return {...state, changePhonePending: payload}
        case GET_USER_PENDING:
            return {...state, getUserPending: payload}
        case GET_USER:
            return {...state, user: payload}
        case SET_ID:
            return {...state, _id: payload}
        case LOGIN_PENDING:
            return {...state, loginPending: payload}
        case PATCH_BIO:
            return update(state, {
                user: {
                    1: {
                        bio: {$set: payload}
                    }
                }
            })
        case PATCH_USERNAME:
            return  update(state, {
                user: {
                        username: {$set: payload}
                }
            })
        case PATCH_PHONE:
            return update(state, {
                user: {
                        phone: {$set: payload}
                }
            })
        default:
            return state;
    }
}
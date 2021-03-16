import update from 'react-addons-update';

import {
    PATCH_BIO,
    PATCH_PHONE,
    PATCH_USERNAME,
    GET_USER,
    LOGIN_PENDING,
    SET_TOKEN,
    LOGIN_BOOL,
    LOGGEDINORNOT,
    SET_ID,
    CREATE_OR_LOGIN,
    GET_ALL_USERS,
} from '../actions/userActionType';

const initialPendingState = {
    loginPending: false,
}

const initialState = {
    ...initialPendingState,
    _id: null,
    user: [],
    token: '',
    loggedIn: false,
    logbool: true,
    create: false,
    AllUsers: [],
}

export default function userReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
        case GET_ALL_USERS:
            return  {...state, AllUsers:payload}
        case SET_TOKEN:
            return {...state, token: payload}
        case LOGGEDINORNOT:
            return {...state, loggedIn: payload}
        case LOGIN_BOOL:
            return {...state, logbool: payload}
        case GET_USER:
            return {...state, user: payload}
        case SET_ID:
            return {...state, _id: payload}
        case LOGIN_PENDING:
            return {...state, loginPending: payload}
        case CREATE_OR_LOGIN:
            return {...state, create: payload}
        case PATCH_BIO:
            return {...state, currentUserBio: payload}
        case PATCH_USERNAME:
            return  update(state, {
                user: {
                        username: {$set: payload}
                }
            })
        case PATCH_PHONE:
            return {...state, currentUserBio: payload}
        default:
            return state;
    }
}
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
} from '../actions/userActionType';

const initialPendingState = {
    getUserPending: false,
    changeUsernamePending: false,
    changePhonePending: false,
    changeBioPending: false,
}

const initialState = {
    ...initialPendingState,
    _id: null,
    user: {
        "username": "MrCommonNoob",
        "phone": "7727021196",
        "bio": "Gamer, Coder, Hacker Currentyl studing in IIT-R fdslfjdflkdjfldsjflasdjdlfjdslfjdafl",
        "gmail": "gsooouuu@gmail.com",
    },
}

export default function userReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
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
        case PATCH_BIO:
            return update(state, {
                user: {
                    1: {
                        bio: payload
                    }
                }
            })
        case PATCH_USERNAME:
            return  update(state, {
                user: {
                    1: {
                        username: payload
                    }
                }
            })
        case PATCH_PHONE:
            return update(state, {
                user: {
                    1: {
                        phone: payload
                    }
                }
            })
        default:
            return state;
    }
}
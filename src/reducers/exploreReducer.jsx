import {
    GET_GROUPS,
    GET_GROUPS_PENDING,
} from '../actions/exploreActionType';

const initialPendingState = {
    getGroupsPending: false,
}

const initialState = {
    ...initialPendingState,
    groups: [],
    error: null,
}

export default function exploreReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case GET_GROUPS_PENDING:
            return {...state, getGroupsPending: payload}
        case GET_GROUPS:
            return {...state, groups: payload}
        default:
            return state
    }   
}
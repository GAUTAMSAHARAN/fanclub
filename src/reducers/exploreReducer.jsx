import {
    GET_GROUPS,
    GET_GROUPS_PENDING,
    GET_SEARCH_GROUPS,
    SET_SEARCH,
} from '../actions/exploreActionType';

const initialPendingState = {
    getGroupsPending: false,
}

const initialState = {
    ...initialPendingState,
    groups: [],
    searchGroups: [],
    error: null,
    search: false,
}

export default function exploreReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case SET_SEARCH:
            return {...state, search: payload}
        case GET_SEARCH_GROUPS:
            return {...state, searchGroups: payload}
        case GET_GROUPS_PENDING:
            return {...state, getGroupsPending: payload}
        case GET_GROUPS:
            return {...state, groups: payload}
        default:
            return state
    }   
}
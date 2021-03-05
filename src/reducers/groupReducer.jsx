import {
    CREATE_GROUP,
    CREATE_GROUP_PENDING,
    GET_USER_GROUPS,
    JOIN_GROUP,
    CURRENT_GROUP,
} from '../actions/groupActionType';

const initialPendingState = {
    createGruopPending: false,
}

const initialState = {
    ...initialPendingState,
    group: [],
    currentUserGroups: [],
    currentGroup: [],
}

export default function groupReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
        case CREATE_GROUP:
            return {state, group: payload}
        case CREATE_GROUP_PENDING:
            return {...state, createGruopPending: payload}
        case GET_USER_GROUPS:
            return {...state, currentUserGroups: payload}
        case JOIN_GROUP:
            return {...state, currentUserGroups: [payload, ...state.currentUserGroups]}
        case CURRENT_GROUP:
            return {...state, currentGroup: payload}
        default:
            return state;
    }
}
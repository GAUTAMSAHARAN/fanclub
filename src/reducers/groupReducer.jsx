import {
    CREATE_GROUP,
    CREATE_GROUP_PENDING,
    GET_USER_GROUPS,
    JOIN_GROUP,
    CURRENT_GROUP,
    CURRENT_GROUP_MESSAGES,
    CURRENT_GROUP_ID,
    ADD_NEW_MESSAGE,
    MAKE_ADMIN,
    MAKE_MEMBER,
    REMOVE_ADMIN,
    REMOVE_MEMBER,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    SET_CURRENT_GROUP_CREATER,
    SET_NEW_IMAGE_MESSAGE,
    ADD_MEMBERS,
    SET_ROLE,
} from '../actions/groupActionType';

const initialPendingState = {
    createGruopPending: false,
}

const initialState = {
    ...initialPendingState,
    group: [],
    currentUserGroups: [],
    currentGroup: [],
    currentGroupMessages: [],
    currentGroupId: null,
    currentGroupCreater: null,
    newImageMessage: null,
    userRole: { 
        admin: false,
        creater: false,
        member: false,
    },
}

export default function groupReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
        case SET_ROLE:
            return {...state, userRole: payload}
        case ADD_MEMBERS:
            return {...state, currentGroup: payload}
        case SET_NEW_IMAGE_MESSAGE:
            return {...state, newImageMessage: payload}
        case SET_CURRENT_GROUP_CREATER:
            return {...state, currentGroupCreater: payload}
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
        case CURRENT_GROUP_MESSAGES:
            return {...state, currentGroupMessages: payload}
        case CURRENT_GROUP_ID:
            return {...state, currentGroupId: payload}
        case ADD_NEW_MESSAGE:
            return {...state, currentGroupMessages: [payload, ...state.currentGroupMessages]}
        case DELETE_MESSAGE:
            return {...state, currentGroupMessages: payload}
        case EDIT_MESSAGE:
            return {...state, currentGroupMessages: payload}
        case MAKE_ADMIN:
            return {...state, currentGroup:{
                ...state.currentGroup,
                admins: payload
            }}
        case REMOVE_ADMIN:
            return {...state, currentGroup: {
                ...state.currentGroup,
                admins:payload
            }}
        case MAKE_MEMBER:
            return {...state, currentGroup: {
                ...state.currentGroup,
                members: payload
            }}
        case REMOVE_MEMBER:
            return {...state, currentGroup:{
                ...state.currentGroup,
                members: payload
            }}
        default:
            return state;
    }
}
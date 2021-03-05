import {
    SHOW_OR_HIDE_MEMBERS_LIST,
} from '../actions/chatActionType';

const initialPendingState = {

}

const initialState = {
    ...initialPendingState,
    showMembersList: true,
}

export default function chatReducer(
    state = initialState,
    { type, payload, error}
){
    switch(type){
        case SHOW_OR_HIDE_MEMBERS_LIST:
            return { ...state, showMembersList: payload}
        default:
            return state
    }
}
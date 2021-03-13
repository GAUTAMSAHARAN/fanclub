import{
    ACTIVE_ELEMENT
} from '../actions/sidemenuActionType';

const initialState = {
    id: "explore public groups",
}

export default function sidemenuReducer (
    state = initialState,
    {type, payload}
){
    switch(type){
        case ACTIVE_ELEMENT:
            return { ...state, id: payload}
        default:
            return state;
    }
}
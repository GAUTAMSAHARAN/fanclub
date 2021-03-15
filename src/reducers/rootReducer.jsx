import { combineReducers } from 'redux';
import sidemenuReducer from './sidemenuReducers';
import exploreReducer from './exploreReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
    sidemenuReducer,
    exploreReducer,
    userReducer,
    groupReducer, 
    chatReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
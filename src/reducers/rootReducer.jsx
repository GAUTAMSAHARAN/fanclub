import { combineReducers } from 'redux';
import sidemenuReducer from './sidemenuReducers';
import exploreReducer from './exploreReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
    sidemenuReducer,
    exploreReducer,
    userReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
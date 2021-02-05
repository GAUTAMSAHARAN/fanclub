import { combineReducers } from 'redux';
import sidemenuReducer from './sidemenuReducers';

const appReducer = combineReducers({
    sidemenuReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;
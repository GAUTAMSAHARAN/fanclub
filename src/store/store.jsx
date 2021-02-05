import {applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';
import monitorReducerEnhancer from '../redux/enhancers/monitorReducer';
import logger from '../redux/middleware/logger';

export default function configureStore(preloadedState){
   const middlewares = [logger, thunkMiddleware]
   const middlewareEnhancer = applyMiddleware(...middlewares)

   const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
   const composedEnhancers = compose(...enhancers)

   const store = createStore(rootReducer, preloadedState, composedEnhancers)

   return store
}
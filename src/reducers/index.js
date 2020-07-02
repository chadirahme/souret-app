import counterReducer from './counter';
import routerReducer from './rotateReducer';
import {combineReducers} from 'redux';

const allReducers= combineReducers({
    mycounter : counterReducer,
    routerReducer: routerReducer

});

export default allReducers;
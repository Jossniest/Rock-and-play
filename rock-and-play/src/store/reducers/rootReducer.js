import {combineReducers} from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    sessionState : sessionReducer,
    userState: userReducer,
    authState: authReducer,
})

export default rootReducer;
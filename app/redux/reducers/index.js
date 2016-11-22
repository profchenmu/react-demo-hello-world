import {combineReducers} from 'redux';
import login from './login';
import nav from './nav';
import {routerReducer} from 'react-router-redux';


const rootApp = combineReducers({
  login,
  nav,
  routing: routerReducer
});

export default rootApp;
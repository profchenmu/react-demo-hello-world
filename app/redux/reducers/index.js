import {combineReducers} from 'redux';
import login from './login';
import nav from './nav';


const rootApp = combineReducers({
  login,
  nav
});

export default rootApp;
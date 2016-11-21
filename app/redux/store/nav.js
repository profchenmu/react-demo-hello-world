import {createStore} from 'redux';
import rootReducer from '../reducers/index';

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState
);

export default configureStore;
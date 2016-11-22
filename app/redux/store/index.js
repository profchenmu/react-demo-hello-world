import {createStore} from 'redux';
import rootReducer from '../reducers/index';





// const store = createStore(rootApp);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState
);

export default configureStore;
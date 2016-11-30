import {applyMiddleware, compose, createStore} from 'redux';
import rootReducer from '../reducers/index';
import middlewares from './middlewares';
// import enhancers from './enhancers';





// const store = createStore(rootApp);

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(...middlewares),
    // ...enhancers
  )
);

export default configureStore;
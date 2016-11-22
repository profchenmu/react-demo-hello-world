'use strict';

import '../less/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import indexPage from './component/modules/index/layout';
import managePage from './component/modules/manage/layout';
import loginPage from './component/modules/login/layout';
import {browserHistory, Router, Route, Link} from 'react-router';
import {createStore, combineReducers} from 'redux';
// import * as reducers from './redux/reducers';
import {Provider} from 'react-redux';
import configureStore from './redux/store/index';
import Root from './component/Hello';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

// const rootApp = combineReducers({
// 	...reducers,
// 	routing: routerReducer
// });


// const store = createStore(rootApp);

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
<Provider store={store}>
<Router history={history}>

	<Route path="/" component={Root}>
		<Route path="/index"
		       component={indexPage} />
		<Route path="/manage"
		       component={managePage} />
	</Route>
	<Route path="/login" component={loginPage} />
</Router>
</Provider>,
  document.getElementById('rootAll')
);
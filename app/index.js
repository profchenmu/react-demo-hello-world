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



const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);

console.log(store.getState().login);

function userAuth(nextState, replace, next) {
  let {login} = store.getState();
  console.log(login);
  if (login.value2 == true) {
  	return next();
  }else{
  	alert('请先登录后再访问')
  // history.goBack()
  next(replace('/login')) 
  // # 举例：跳转到登录页的写法
  }

  
}

ReactDOM.render(
<Provider store={store}>
<Router history={history}>

	<Route path="/" component={Root}>
		<Route path="/index"
		       component={indexPage} 
		       onEnter={userAuth}/>
		<Route path="/manage"
		       component={managePage} />
	</Route>
	<Route path="/login" component={loginPage} />
</Router>
</Provider>,
  document.getElementById('rootAll')
);

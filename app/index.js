'use strict';

import '../less/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import indexPage from './component/modules/index/layout';
import managePage from './component/modules/manage/layout';
import loginPage from './component/modules/login/layout';
import {browserHistory, Router, Route, Link} from 'react-router';
import {createStore} from 'redux';
import counter from './redux/reducers/nav';

import {Provider} from 'react-redux';
import configureStore from './redux/store/nav';
import Root from './component/Hello';

const store = configureStore();

// const store = createStore(counter);





ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory}>

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
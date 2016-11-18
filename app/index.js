'use strict';

import '../less/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import indexPage from './component/modules/index/layout';
import managePage from './component/modules/manage/layout';
import {browserHistory, Router, Route, Link} from 'react-router';



import Root from './component/Hello';

ReactDOM.render(
  <Router history={browserHistory}>

          <Route path="/" component={Root}>
            <Route path="/index"
                   component={indexPage} />
            <Route path="/manage"
                   component={managePage} />
          </Route>
        </Router>,
  document.getElementById('main')
);
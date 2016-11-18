import React from 'react';
import { browserHistory, Router, Route, Link } from 'react-router';
import indexPage from '../modules/index/layout';
import managePage from '../modules/manage/layout';
import App from '../Hello';

export default <Route path="/" component={App}>
  <Route path="/index"
         component={indexPage} />
  <Route path="/manage"
         component={managePage} />
</Route>
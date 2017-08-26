import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import routes from './modules/app/index';
import {render} from 'react-dom'
require("./../public/style/main.scss")
render(
  <Router>
        {routes}
  </Router>, document.getElementById('root')
);

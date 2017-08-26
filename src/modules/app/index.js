import React from 'react';
import {render} from 'react-dom';
import PostPage from './../PostPage/PostPage';
import Signup from './../SignUp/SignUp';
import { BrowserRouter, Route ,Switch } from 'react-router-dom'
const routes = (
    <Switch>
      <Route exact path ="/" component = {Signup} />
      <Route path ="/postpage" component = {PostPage} />
    </Switch>
);
export default routes;

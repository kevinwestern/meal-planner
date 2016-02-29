import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import MealApp from './src/app'

render(
  <Router history={hashHistory}>
    <Route path="/" component={MealApp}/>
  </Router>,
  document.getElementById('content')
);
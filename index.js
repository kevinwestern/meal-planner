import 'babel-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import MealApp from './src/app'
import WeekPlan from './src/week-plan'

render(
  <Router history={hashHistory}>
    <Route path="/" component={MealApp}/>
    <Route path="/week" component={WeekPlan}/>
  </Router>,
  document.getElementById('content')
);

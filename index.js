import 'babel-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import {EditMealContainer} from './src/edit-meal-container'
import {CreateMealContainer} from './src/create-meal-container'
import {MealListContainer} from './src/meal-list-container'

render(
  <Router history={browserHistory}>
    <Route path="/" component={MealListContainer}/>
    <Route path="/meals/create" component={CreateMealContainer}/>
    <Route path="/meals/edit/:mealName" component={EditMealContainer}/>
  </Router>,
  document.getElementById('content')
);

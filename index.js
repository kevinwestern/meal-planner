import 'babel-polyfill';
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import MealApp from './src/app'
import WeekPlan from './src/week-plan'

function foodApp(state = initialState, action) {
  // For now, don’t handle any actions
  // and just return the state given to us.
  return state;
};

let meals = localStorage.getItem('meals');
if (!meals) {
  meals = [];
} else {
  meals = JSON.parse(meals);
}

// let store = createStore(foodApp, foods);
let newMealForm = [{
  id: 'name',
  label: 'Name:',
  name: 'name',
  placeholder: 'Baked Chicken',
  required: true,
  type: 'text',
  value: '',
}, {
  id: 'cals',
  label: 'Calories:',
  name: 'cals',
  placeholder: 450,
  required: false,
  type: 'number',
  value: '',
}, {
  id: 'protein',
  label: 'Protein:',
  name: 'protein',
  placeholder: 50,
  required: false,
  type: 'number',
  value: '',
}, {
  id: 'carbs',
  label: 'Carbs:',
  name: 'carbs',
  placeholder: 40,
  required: false,
  type: 'number',
  value: '',
}, {
  id: 'fat',
  label: 'Fat:',
  name: 'fat',
  placeholder: 10,
  required: false,
  type: 'number',
  value: '',
}];

const store = {
  listeners_: [],
  newMealForm: newMealForm,
  meals: meals,

  updateFormField: function (index, value) {
    this.newMealForm = this.newMealForm.map((field, i) => {
      return i == index ?
        Object.assign({}, field, {value}) :
        field;
    })
    this.dispatchChange();
  },

  addMeal: function(mealForm) {
    this.meals.push(this.formToJson_(mealForm));
    localStorage.setItem('meals', JSON.stringify(this.meals));
    this.newMealForm = newMealForm;
    this.dispatchChange();
  },

  formToJson_: function(form) {
    return {
      name: form[0].value,
      nutrients: form.slice(1).map(nutrient => ({name: nutrient.name, value: nutrient.value}))
    };
  },

  addChangeListener: function(listener) {
    this.listeners_.push(listener);
  },

  getNewMealForm: function() {
    return this.newMealForm;
  },

  getMeals: function() {
    return this.meals;
  },

  dispatchChange: function() {
    this.listeners_.forEach(listener => {
      listener();
    });
  }
}

render(
  <MealApp meals={meals}
           newMealForm={newMealForm}
           store={store}></MealApp>,
  document.getElementById('content')
);

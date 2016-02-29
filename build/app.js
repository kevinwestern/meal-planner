'use strict';

import React from 'react';
import { render } from 'react-dom';

class CompactMeal extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        null,
        this.props.meal.name
      ),
      React.createElement(
        'div',
        { className: 'compact-meal-nutrients' },
        React.createElement(
          'ul',
          null,
          this.props.meal.nutrients.map(nutrient => {
            return React.createElement(
              'li',
              { key: nutrient.name },
              nutrient.name,
              ' - ',
              nutrient.value
            );
          })
        )
      )
    );
  }
};

export default class MealApp extends React.Component {
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        null,
        'Meals'
      ),
      React.createElement(
        'ul',
        null,
        this.props.compactMeals.map(meal => {
          return React.createElement(
            'li',
            { key: meal.name },
            React.createElement(CompactMeal, { meal: meal })
          );
        })
      )
    );
  }
};

ReactDOM.render(React.createElement(MealApp, {
  compactMeals: [{
    name: 'Edameme Spaghetti with Turkey Meatballs',
    nutrients: [{
      name: 'Carb',
      value: 24
    }, {
      name: 'Protein',
      value: 30
    }] }, { name: 'Chicken Strips and Broccoli', nutrients: [] }, { name: 'Chicken with Sweet Potato Fries and Veggies', nutrients: [] }, { name: 'Salmon with Brccoli', nutrients: [] }]
}), document.getElementById('content'));
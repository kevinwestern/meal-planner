'use strict';

import React from 'react'

class CompactMeal extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.meal.name}</div>
        <div className="compact-meal-nutrients">
          <ul>
            {this.props.meal.nutrients.map(nutrient => {
              return <li key={nutrient.name}>{nutrient.name} - {nutrient.value}</li>
            })}
          </ul>
        </div>
      </div>
    );
  }
};

var MealApp = React.createClass({

  getInitialState: function() {
    return {
      compactMeals: [{
        name: 'Edameme Spaghetti with Turkey Meatballs',
        nutrients: [{
          name: 'Carb',
          value: 24,
        },{
          name: 'Protein',
          value: 30,
        }]},
        {name: 'Chicken Strips and Broccoli', nutrients: []},
        {name: 'Chicken with Sweet Potato Fries and Veggies', nutrients: []},
        {name: 'Salmon with Brccoli', nutrients: []},
      ],
    };
  },

  render: function() {
    return (
      <div>
        <h1>Meals</h1>
        <ul>
          {this.state.compactMeals.map(meal => {
            return <li key={meal.name}><CompactMeal meal={meal}></CompactMeal></li>
          })}
        </ul>
      </div>
    )
  },
});

export default MealApp;
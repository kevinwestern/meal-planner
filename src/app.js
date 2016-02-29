'use strict';

import { Component } from 'react'
import CompactMeal from './compact-meal';

export default class MealApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
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
  }

  render() {
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
  }
}

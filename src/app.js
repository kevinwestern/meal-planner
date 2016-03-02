'use strict';

import { Component } from 'react'
import CompactMeal from './compact-meal';
import FOODS from '../seed-data'

export default class MealApp extends Component {
  constructor(props, context) {
    super(props, context);
    const foods = localStorage.getItem('foods');
    this.state = {
      compactMeals: foods ? JSON.parse(foods) : FOODS,
      newMealForm: [{
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
      }]
    };
  }

  addFood(e) {
    e.preventDefault();
    const foods = JSON.parse(localStorage.getItem('foods') || '[]');
    foods.push(this.formToJson_(this.state.newMealForm));
    localStorage.setItem('foods', JSON.stringify(foods));
    this.setState({
      compactMeals: foods,
      newMealForm: this.state.newMealForm.map(field => {
        return Object.assign({}, field, {value: ''});
      })
    });
  }

  formToJson_(newMealForm) {
    return {
      name: newMealForm[0].value,
      nutrients: newMealForm.slice(1).map(nutrient => ({name: nutrient.name, value: nutrient.value}))
    };
  }

  updateFormState(e) {
    this.setState({
      newMealForm: this.state.newMealForm.map((field, index) => {
        return index == e.target.dataset.index ?
          Object.assign({}, field, {value: e.target.value}) :
          field;
      })
    });
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
        <div className="fab-button"></div>
        <NewMealForm form={this.state.newMealForm}
                     onChange={this.updateFormState.bind(this)}
                     onSubmit={this.addFood.bind(this)}></NewMealForm>
      </div>
    )
  }
}

function NewMealForm(props) {
  return (
    <div id="new-meal-form">
      <form onSubmit={props.onSubmit}>
        {props.form.map((field, index) => {
          return <div key={index}>
            <label htmlFor={field.id}>{field.label}</label>
            <input data-index={index}
                   id={field.id}
                   name={field.name}
                   placeholder={field.placeholder}
                   required={field.required}
                   type={field.type}
                   value={field.value}
                   onChange={props.onChange}/>
           </div>
        })}
        <input type="submit" value="Add"></input>
      </form>
    </div>
  );
}
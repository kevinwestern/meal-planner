'use strict';

import { Component } from 'react'
import CompactMeal from './compact-meal';
import FOODS from '../seed-data'

export default class MealApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      newMealForm: this.props.store.getNewMealForm(),
      meals: this.props.store.getMeals()
    };
  }

  componentDidMount() {
    this.props.store.addChangeListener(this.updateState_.bind(this))
  }

  addFood(e) {
    e.preventDefault();
    this.props.store.addMeal(this.state.newMealForm);
  }

  updateFormState(e) {
    this.props.store.updateFormField(e.target.dataset.index, e.target.value)
  }

  updateState_() {
    this.setState({
      newMealForm: this.props.store.getNewMealForm(),
      meals: this.props.store.getMeals()
    });
  }

  render() {
    return (
      <div>
        <h1>Meals</h1>
        <ul>
          {this.state.meals.map(meal => {
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
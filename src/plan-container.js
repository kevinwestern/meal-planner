import {store} from './store';
import EditMeal from './edit-meal';
import { Component } from 'react';
import { Link } from 'react-router';


export class PlanContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.day = this.props.params.dateInSeconds;
  }

  componentWillMount() {
    this.updateState_();
    store.onUpdateMealsForDay(this.updateState_.bind(this))
  }

  getMealsForDay(day) {
    return store.getMealsForDay(this.day).reduce((obj, meal) => {
      obj[meal.name] = meal;
      return obj;
    }, {});
  }

  updateState_() {
    const selectedMeals = store.getMealsForDay(this.day);
    const nutrientTotals = {
      fat: 0,
      carbs: 0,
      protein: 0,
      calories: 0
    };
    selectedMeals.forEach(meal => {
      nutrientTotals.fat += meal.nutrients.fat;
      nutrientTotals.carbs += meal.nutrients.carbs;
      nutrientTotals.protein += meal.nutrients.protein;
      nutrientTotals.calories += meal.nutrients.calories;
    });
    this.setState({
      selectedMeals: this.getMealsForDay(this.day),
      nutrientTotals: Object.keys(nutrientTotals).map(nutrient => {
        return {
          name: nutrient,
          value: nutrientTotals[nutrient]
        };
      })
    });
  }

  render() {
    return (
      <DayView day={this.day}
               meals={store.getMeals()}
               nutrientTotals={this.state.nutrientTotals}
               selectedMeals={this.state.selectedMeals}></DayView>
    )
  }
}

export class DayView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  makeMealChooser(meal) {
    return this.mealToggled.bind(this, meal)
  }

  mealToggled(meal, evt) {
    // convert to an action
    store.mealForDayToggled(meal, this.props.day)
  }

  render() {
    return (
      <div>
        <div className="plan-day-view">
          <NutrientTotals nutrients={this.props.nutrientTotals}></NutrientTotals>
        </div>
        <ul className="plan-day-meals mdl-list">
          {this.props.meals.map(meal => {
            return <li key={meal.name} className="plan-day-meals-meal mdl-list__item mdl-list__item--two-line">
              <div className="mdl-list__item-primary-content">
                <span className="name">{meal.name}</span>
                <span className="mdl-list__item-sub-title">Calories:  {meal.nutrients.calories}</span>
              </div>
              <div className="mdl-list__item-secondary-action">
                <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor={"list-checkbox-" + meal.name}>
                  <input type="checkbox" id={"list-checkbox-" + meal.name} className="mdl-checkbox__input"
                         onChange={this.makeMealChooser(meal)} checked={!!this.props.selectedMeals[meal.name]}/>
                </label>
              </div>
            </li>
          }, this)}
        </ul>
      </div>
    )
  }
}

export class NutrientTotals extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="nutrient-list-totals">
        <ul className="nutrient-list-totals-list">
          {this.props.nutrients.map(nutrient => {
            return <li key={nutrient.name} className="nutrient-list-totals-list-item">
              <div>{nutrient.name}</div>
              <div>{nutrient.value}</div>
            </li>
          })}
        </ul>
      </div>
    )
  }
}
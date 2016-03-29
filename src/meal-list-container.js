import {store} from './store';
import EditMeal from './edit-meal';
import { Component } from 'react';
import { Link } from 'react-router';


export class MealListContainer extends Component {
  constructor() {
    super();
  }

  render() {
    return <MealList store={store}></MealList>
  }
}

export class MealList extends Component {
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
        <ul className="meal-list mdl-list">
          {this.state.meals.map(meal => {
            return <li key={meal.name} className="mdl-list__item">
              <span className="mdl-list__item-primary-content"><Link to={'meals/edit/' + meal.name}>{meal.name}</Link></span>
              <div className="mdl-list__item-secondary-action meal-calories">
                <div>500</div>
                <div className="meal-calories-subtext">Cal</div>
              </div>
            </li>
          })}
        </ul>
        <Link to='/meals/create'>
          <button className="fab-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
            <i className="material-icons">add</i>
          </button>
        </Link>
      </div>
    )
  }
}

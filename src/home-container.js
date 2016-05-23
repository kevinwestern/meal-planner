import {store} from './store';
import EditMeal from './edit-meal';
import { Component } from 'react';
import { Link } from 'react-router';
import {getTodayInSeconds} from './utils';


export class HomeContainer extends Component {
  constructor() {
    super();
    this.today = getTodayInSeconds();
  }

  render() {
    return <Home store={store}
                 day={this.today}
                 meals={store.getMealsForDay(this.today)}></Home>
  }
}

export class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      displayComponent: this.props.meals.size ?
        <PlannedMeals day={this.today}
                      meals={this.props.meals}/> : <EmptyPlan day={this.props.day} />
    }
  }

  componentDidMount() {
  }

  updateState_() {
  }

  render() {
    return (
      <div>
        {this.state.displayComponent}
      </div>
    )
  }
}

export class PlannedMeals extends Component {
  constructor(props, context) {
    super(props,  context);
  }

  render() {
    return (
      <div>Planned!</div>
    )
  }
}

export class EmptyPlan extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="flex-center center-for-tabs empty-plan">
        <div className="empty-list">
          <div>
            <h3>No meals for today!</h3>
            <Link to={'/plan/' + this.props.day}>Add some meals for today.</Link>
          </div>
        </div>
      </div>
    )
  }
}

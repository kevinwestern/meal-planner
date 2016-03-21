import {store} from './store';
import EditMeal from './edit-meal';
import { Component } from 'react';

export class EditMealContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      form: store.getEditMealForm(this.props.params.mealName)
    });
    store.onUpdateEditMealForm(this.updateState_.bind(this))
  }

  updateState_(updatedForm) {
    this.setState({
      form: updatedForm
    });
  }

  render() {
    return <EditMeal form={this.state.form}
                     store={store}></EditMeal>
  }
}



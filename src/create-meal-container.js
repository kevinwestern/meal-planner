import {store} from './store';
import CreateMeal from './create-meal';
import { Component } from 'react';

export class CreateMealContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      form: store.getNewMealForm()
    });
    store.onUpdateEditMealForm(this.updateState_.bind(this))
  }

  updateState_(updatedForm) {
    this.setState({
      form: updatedForm
    });
  }

  render() {
    return <CreateMeal form={this.state.form}
                     store={store}></CreateMeal>
  }
}



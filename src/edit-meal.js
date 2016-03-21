import { Component } from 'react';

export default class EditMeal extends Component {
  
  constructor(props) {
    super(props);
  }

  update(field) {
    return (e) => {
      this.props.store.updateEditMealForm(this.props.form, field, e.target.value)
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="edit-meal-name">Name:</label>
        <input type="text" id="edit-meal-name" value={this.props.form.name}
               onChange={this.update('name')}/>

        <label htmlFor="edit-meal-calories">Calories:</label>
        <input type="number" id="edit-meal-calories" value={this.props.form.calories}
               onChange={this.update('calories')}/>

        <label htmlFor="edit-meal-carbs">Carbs:</label>
        <input type="number" id="edit-meal-carbs" value={this.props.form.carbs}
               onChange={this.update('carbs')}/>

        <label htmlFor="edit-meal-protein">Protein:</label>
        <input type="number" id="edit-meal-protein" value={this.props.form.protein}
               onChange={this.update('protein')}/>

        <label htmlFor="edit-meal-fat">Fat:</label>
        <input type="number" id="edit-meal-fat" value={this.props.form.fat}
               onChange={this.update('fat')}/>
      </form>
    );
  }
}

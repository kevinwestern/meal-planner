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

  submit(e) {
    e.preventDefault();
    this.props.store.saveEditMealForm(this.props.form);
  }

  render() {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <div className="field">
          <label htmlFor="edit-meal-name">Name:</label>
          <input type="text" id="edit-meal-name" value={this.props.form.name}
                 onChange={this.update('name')}/>
        </div>

        <div className="field">
          <label htmlFor="edit-meal-calories">Calories:</label>
          <input type="number" id="edit-meal-calories" value={this.props.form.nutrients.calories}
                 onChange={this.update('calories')}/>
        </div>

        <div className="field">
          <label htmlFor="edit-meal-carbs">Carbs:</label>
          <input type="number" id="edit-meal-carbs" value={this.props.form.nutrients.carbs}
                 onChange={this.update('carbs')}/>
        </div>

        <div className="field">
          <label htmlFor="edit-meal-protein">Protein:</label>
          <input type="number" id="edit-meal-protein" value={this.props.form.nutrients.protein}
                 onChange={this.update('protein')}/>
        </div>

        <div className="field">
          <label htmlFor="edit-meal-fat">Fat:</label>
          <input type="number" id="edit-meal-fat" value={this.props.form.nutrients.fat}
                 onChange={this.update('fat')}/>
        </div>
        <button type="submit">Save</button>
      </form>
    );
  }
}

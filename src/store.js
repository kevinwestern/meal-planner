import seed_data from '../seed-data'


let meals = localStorage.getItem('meals');
if (!meals) {
  meals = seed_data.MEALS;
} else {
  meals = JSON.parse(meals);
}

// let store = createStore(foodApp, foods);
let newMealForm = {
  name: '',
  nutrients: {
    calories: '',
    carbs: '',
    fat: '',
    protein: ''
  }
};

const store = {
  listeners_: [],
  newMealForm: newMealForm,
  meals: meals,

  addChangeListener: function(listener) {
    this.listeners_.push({listener});
  },

  getNewMealForm: function() {
    return this.newMealForm;
  },

  getMeals: function() {
    return this.meals;
  },

  getEditMealForm: function(mealName) {
    const meal = this.getMeals().find(meal => meal.name == mealName);
    return Object.assign({}, meal);
  },

  getNewMealForm: function() {
    return Object.assign({}, this.newMealForm);
  },

  saveCreateMealForm: function(form) {
    var meals = this.meals.slice();
    meals.push(form);
    localStorage.setItem('meals', JSON.stringify(meals));
    this.newMealForm = newMealForm;
    this.meals = meals;
    this.dispatchChange();
  },

  saveEditMealForm: function(form) {
    var updatedMeal = this.getMeals().find(meal => form.name == meal.name);
    var meals = this.meals.map(meal => {
      return meal.name == form.name ?
        Object.assign({}, meal, form) : meal;
    });
    this.meals = meals;
    localStorage.setItem('meals', JSON.stringify(this.meals));
    this.dispatchChange();
  },

  updateEditMealForm: function(form, field, value) {
    var newForm = Object.assign({}, form);
    if (field == 'name') {
      newForm[field] = value;
    } else {
      newForm.nutrients[field] = value;
    }
    this.dispatchChange('updateEditMealForm', newForm);
  },

  onUpdateEditMealForm: function(cb) {
    this.listeners_.push({
      listener: cb,
      tag: 'updateEditMealForm'
    });
  },

  dispatchChange: function(tag, value) {
    this.listeners_.forEach(observer => {
      // gross
      if ((observer.tag && observer.tag == tag) ||
          (!tag && !observer.tag)) {
        observer.listener(value)
      }
    });
  }
}

exports.store = store;

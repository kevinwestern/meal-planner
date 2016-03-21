import seed_data from '../seed-data'


let meals = localStorage.getItem('meals');
if (!meals) {
  meals = seed_data.MEALS;
} else {
  meals = JSON.parse(meals);
}

// let store = createStore(foodApp, foods);
let newMealForm = [{
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
}];

const store = {
  listeners_: [],
  newMealForm: newMealForm,
  meals: meals,

  updateFormField: function (index, value) {
    this.newMealForm = this.newMealForm.map((field, i) => {
      return i == index ?
        Object.assign({}, field, {value}) :
        field;
    })
    this.dispatchChange();
  },

  addMeal: function(mealForm) {
    this.meals.push(this.formToJson_(mealForm));
    localStorage.setItem('meals', JSON.stringify(this.meals));
    this.newMealForm = newMealForm;
    this.dispatchChange();
  },

  formToJson_: function(form) {
    return {
      name: form[0].value,
      nutrients: form.slice(1).reduce((val, nutrient) => {
        val[nutrient.name] = nutrient.value;
        return val;
      }, {})
    };
  },

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

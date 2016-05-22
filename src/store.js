import seed_data from '../seed-data'
import {Map, List, Record} from 'immutable';

const MealRecord = Record({
  name: '',
  nutrients: {}
});

const NutrientRecord = Record({
  calories: 0,
  carbs: 0,
  fat: 0,
  protein: 0
});

const JS_MEAL_TO_RECORD = jsMeal => {
  return new MealRecord({
    name: jsMeal.name,
    nutrients: new NutrientRecord(jsMeal.nutrients || {})
  })
};

const JS_PLAN_TO_REOCRD = jsPlan => {
  return Object.keys(jsPlan).reduce((obj, dateSeconds) => {
    obj[dateSeconds] = new List(jsPlan[dateSeconds].map(JS_MEAL_TO_RECORD));
    return obj;
  }, {});
}

const planFromStorage = localStorage.getItem('plan');
let plan = new Map();
if (!!planFromStorage) {
  plan = new Map(JS_PLAN_TO_REOCRD(JSON.parse(planFromStorage)));
}

const mealsFromStorage = localStorage.getItem('meals');
let meals = new List(seed_data.MEALS.map(JS_MEAL_TO_RECORD));
if (mealsFromStorage) {
  meals = new List(JSON.parse(mealsFromStorage).map(JS_MEAL_TO_RECORD));
}

const store = {
  listeners_: [],

  addChangeListener: function(listener) {
    this.listeners_.push({listener});
  },

  getMeals: () => meals,

  getEditMealForm: mealName => meals.find(meal => meal.name == mealName),

  getNewMealForm: () => JS_MEAL_TO_RECORD({name: ''}),

  saveCreateMealForm: function(form) {
    meals = meals.push(form);
    localStorage.setItem('meals', JSON.stringify(meals.toJS()));
    this.dispatchChange();
  },

  saveEditMealForm: function(form) {
    const index = meals.findIndex(meal => form.name == meal.name)
    meals = meals.update(index, meal => form)
    localStorage.setItem('meals', JSON.stringify(meals.toJS()));
    this.dispatchChange();
  },

  updateEditMealForm: function(form, field, value) {
    var newForm = form.toJS();
    if (field == 'name') {
      newForm.name = value;
    } else {
      newForm.nutrients[field] = value;
    }
    this.dispatchChange('updateEditMealForm',
      new MealRecord(JS_MEAL_TO_RECORD(newForm)));
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
  },

  getMealsForDay: dateInSeconds => plan.get(dateInSeconds) || new List(),

  mealForDayToggled: function(meal, day) {
    let mealsForDay = this.getMealsForDay(day);
    const existingIndex = mealsForDay.findIndex(m => m.name == meal.name);
    if (existingIndex == -1) {
      mealsForDay = mealsForDay.push(meal)
    } else {
      mealsForDay = mealsForDay.delete(existingIndex)
    }
    plan = plan.set(day, mealsForDay);
    this.savePlan(plan)
    this.dispatchChange('updateMealsForDay');
  },

  savePlan: function(plan) {
    localStorage.setItem('plan', JSON.stringify(plan.toJS()));
  },
  
  onUpdateMealsForDay: function(cb) {
    this.listeners_.push({
      listener: cb,
      tag: 'updateMealsForDay'
    });
  },
}

exports.store = store;

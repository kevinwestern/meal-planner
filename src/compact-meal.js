export default function CompactMeal(props) {
  return (
    <div>
      <div>{props.meal.name}</div>
      <div className="compact-meal-nutrients">
        <ul>
          {props.meal.nutrients.map(nutrient => {
            return <li key={nutrient.name}>{nutrient.name} - {nutrient.value}</li>
          })}
        </ul>
      </div>
    </div>
  );
}

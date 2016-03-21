import { Link } from 'react-router'

export default function Meal(props) {
  return (
    <div className="meal">
      <div className="meal-header">
        <div><Link to={'meals/edit/' + props.meal.name}>{props.meal.name}</Link></div>
        <div className="meal-header-calories">
          <div>500</div>
          <div className="meal-header-cal">Cal</div>
        </div>
      </div>
    </div>
  );
}

import FoodModel from "../../Model/FoodModel"
import "./FoodItem.css"
import { Link } from "react-router-dom";

type Props = {
  rescipe: FoodModel
}

function FoodItem({ rescipe }: Props) {

  return (
    <Link className="link-style" to={'/food/recipe/' + rescipe.id}>
      <section className="rescipe-box">
        <div className="card-wraper">
          <h2>{rescipe.time} Min</h2>
          <span>-</span>
          <h2>{rescipe.portion_size} Personer</h2>
        </div>
        <h1>{rescipe.dish_name}</h1>
        <img className="image-style" src={rescipe.image} alt={'image of ' + rescipe.dish_name} />
      </section>
    </Link>
  )
}

export default FoodItem
import { useEffect } from "react";
import FoodModel from "../../Model/FoodModel"
import { useParams } from "react-router-dom";
import './FoodRecipe.css';

type Props = {
  rescipe: null | FoodModel,
  fetchRequest: (id: number) => void
}

function FoodRecipe({ rescipe, fetchRequest }: Props) {
  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      fetchRequest(parseInt(id))
    }
  }, [])

  {
    if (rescipe == null) return (
      <h1>Rescipe Not Fond</h1>
    )
  }

  return (
    <article className="food-recipe">
      <section className="recipe-header">
        <h2>{rescipe.dish_name}</h2>
        <div className="recipe-info">
          <p>{rescipe.time} min</p>
          <span>-</span>
          <p>{rescipe.portion_size} personer</p>
        </div>
      </section>

      <section className="recipe-ingredients">
        <h3>ingrediens</h3>
        <ul>
          {
            rescipe.ingredients.map(ingredient => {
              return <li>{ingredient.item}</li>
            })
          }
        </ul>
      </section>

      <section className="recipe-instructions">
        <h3>discription</h3>
        <ol>
          {
            rescipe.descriptions.map(info => {
              return <li>{info.description}</li>
            })
          }
        </ol>
      </section>
    </article>
  )
}

export default FoodRecipe
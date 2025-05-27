import { useEffect, useState } from "react";
import FoodModel from "../../Model/FoodModel"
import FoodItem from "./FoodItem"
import './FoodList.css';
import { useNavigate } from "react-router-dom";

type Props = {
  rescipes: FoodModel[]
}

function FoodList({ rescipes }: Props) {
  const navigate = useNavigate();
  const [filteredFood, setFilteredFood] = useState<FoodModel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  function filterRecipes(event: React.ChangeEvent<HTMLInputElement>) {
    const newText = event.currentTarget.value;
    setSearchQuery(newText);

    const searchTerms = newText
      .toLowerCase()
      .split(',')
      .map(term => term.trim())
      .filter(term => term.length > 0);

    const filtered = rescipes.filter(recipe =>
      searchTerms.every(term =>
        recipe.dish_name.toLowerCase().includes(term) ||
        recipe.ingredients.some(({ item }) => item.toLowerCase().includes(term))
      )
    );

    setFilteredFood(filtered);
  }

  function handleSupriseMe() {
    const randomIndex = Math.floor(Math.random() * filteredFood.length)
    const id = filteredFood[randomIndex].id
    navigate(`/food/recipe/${id}`);
  }

  useEffect(() => {
    setFilteredFood(rescipes);
  }, [rescipes])

  return (
    <section className="main-list-body">
      <div className="serech">
        <input onChange={filterRecipes}
          value={searchQuery}
          className="serech-box"
          type="text"
          placeholder="Sök recept..." />
        <button onClick={handleSupriseMe}>Överaska mig</button>
      </div>
      <article className="list-body">
        {
          filteredFood.map(rescipe => {
            return <FoodItem key={rescipe.id} rescipe={rescipe} />
          })
        }
      </article>
    </section>
  )
}

export default FoodList
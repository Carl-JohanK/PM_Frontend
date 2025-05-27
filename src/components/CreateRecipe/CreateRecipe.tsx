import { FormEvent, useState } from "react";
import FoodModel from "../../Model/FoodModel";
import { useNavigate } from "react-router-dom";
import './CreateRecipe.css';

type prop = {
    createRescipe: (recipe: FoodModel) => Promise<FoodModel | null>,
    fetchAllRescipes: () => void;
}

const emptyRecipe: FoodModel = {
    image: "",
    time: 0,
    portion_size: 0,
    dish_name: "",
    descriptions: [{
        description: ""
    }],
    ingredients: [{
        item: ""
    }]
}

function CerateRecipe({ createRescipe, fetchAllRescipes }: prop) {
    const navigate = useNavigate();
    const [newRecipe, setNewRecipe] = useState<FoodModel>(emptyRecipe)

    function handleInput(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        const key = e.currentTarget.name;
        let value: string | number = e.currentTarget.value;

        if (key == 'time' || key == 'portion_size') {
            const numValue = Number(value);
            value = isNaN(numValue) ? 0 : numValue;
        } else {
            value.trim();
        }

        setNewRecipe((prev) => ({
            ...prev,
            [key]: value
        }));
    }

    function handleArrayInput(
        key: "ingredients" | "descriptions",
        index: number,
        value: string) {
        setNewRecipe((prev) => ({
            ...prev,
            [key]: prev[key].map((item, i) =>
                i === index ? {
                    ...item,
                    [key === "ingredients" ? "item" : "description"]: value
                } : item
            )
        }));
    }

    function handleArrayLength(key: "ingredients" | "descriptions", isPlus: boolean) {
        setNewRecipe((prev) => {
            const updatedArray = [...(prev[key] || [])];

            if (isPlus) {
                updatedArray.push({ item: "" });
            } else {
                updatedArray.pop();
            }

            return {
                ...prev,
                [key]: updatedArray,
            };
        })
    }

    const submitRecipe = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const createdRecipe = await createRescipe(newRecipe);

        if (createdRecipe) {
            fetchAllRescipes();
            navigate(`/food/recipe/${createdRecipe.id}`);
        } else {
            console.error("Failed to create recipe.");
        }
    };

    return (
        <form onSubmit={submitRecipe} action="supmit" className="form">
            <div className="form-header">
                <h1>skapa ditt resept</h1>
                <textarea
                    className="input-box"
                    placeholder="img URL"
                    onChange={handleInput}
                    required
                    name="image"
                    id="img"
                    rows={1}></textarea>
            </div>
            <main className="form-content">
                <article className="side-content">
                    <section className="form-input extra-gap">
                        <textarea
                            className="input-box"
                            placeholder="dich name"
                            onChange={handleInput}
                            required
                            name="dish_name"
                            id="name"
                            rows={1}></textarea>
                        <div className="input-wraper">
                            <input
                                className="input-box"
                                type="number"
                                placeholder="Tid"
                                onChange={handleInput}
                                required
                                name="time"
                                min="1"
                            />
                            <p>Min</p>
                        </div>
                    </section>

                    <section className="form-input extra-gap">
                        <div className="input-wraper">
                            <input
                                className="input-box"
                                type="number"
                                placeholder="Antal"
                                onChange={handleInput}
                                required
                                name="portion_size"
                                min="1"
                            />
                            <p>Persioner</p>
                        </div>
                    </section>
                </article>

                <article className="side-content extra-gap">
                    <section className="list-items">
                        <div className="form-input">
                            <h3>ingredient:</h3>

                            <div className="div-button"
                                onClick={() => handleArrayLength("ingredients", true)}>+</div>
                            <div className="div-button"
                                onClick={() => handleArrayLength("ingredients", false)}>-</div>
                        </div>
                        {
                            newRecipe.ingredients.map((info, index) => {
                                return (
                                    <textarea className="larg-text-area input-box"
                                        rows={1}
                                        key={index}
                                        required
                                        name={`ingredients-${index}`}
                                        id="ingredients"
                                        onChange={(e) => { handleArrayInput("ingredients", index, e.currentTarget.value) }}
                                    ></textarea>
                                )
                            })
                        }
                    </section>

                    <section className="list-items">
                        <div className="form-input">
                            <h3>description:</h3>

                            <div className="div-button"
                                onClick={() => handleArrayLength("descriptions", true)}>+</div>
                            <div className="div-button"
                                onClick={() => handleArrayLength("descriptions", false)}>-</div>
                        </div>
                        {
                            newRecipe.descriptions.map((info, index) => {
                                return (
                                    <textarea className="larg-text-area input-box"
                                        key={index}
                                        required
                                        name={`descriptions-${index}`}
                                        id="descriptions"
                                        onChange={(e) => { handleArrayInput("descriptions", index, e.currentTarget.value) }}
                                    ></textarea>
                                )
                            })
                        }
                    </section>
                </article>
            </main>

            <button>create recipe</button>
        </form>
    )
}

export default CerateRecipe;
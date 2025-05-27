type FoodModel = {
    id?: number,
    image: string,
    time: number,
    portion_size: number,
    descriptions: [{
        description: string
    }],
    dish_name: string,
    ingredients: [{
        item: string
    }]
}

export default FoodModel;
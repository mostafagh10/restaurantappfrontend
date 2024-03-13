import { GET_FOODS , GET_FOOD , ADD_food , DELETE_FOOD } from "../constant/foodconstant";

const INITIAL_STATE = {
    foods : []
}

export const foodreducer = (state = INITIAL_STATE , action) => {
    switch (action.type){
        case ADD_food:
            return{
                foods : [...state.foods , action.payload],
            };
        case GET_FOODS:
            return{
                foods: [...action.payload],
            };
        case GET_FOOD:
            return{
                food : action.payload,
            };
        case DELETE_FOOD:
            return{
               foods : state.foods.filter(f => f._id !== action.payload._id)
            }
        default:
            return state;
    }
}
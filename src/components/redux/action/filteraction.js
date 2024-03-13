import { FILTER_FOODS } from "../constant/filterconstant";
import {GET_FOODS} from '../constant/foodconstant'
import axios from "axios";

export const filterfoodsaction = (sortBy , limit) => async dispatch => {
    try {
        const response = await axios.get(`https://restaurantappbackend.onrender.com/api/food?sortBy=${sortBy}&limit=${limit}`)
        dispatch({type:FILTER_FOODS , payload : response.data.foods})
    } catch (error) {
        console.log(error)
    }
}

export const postfoodsbyfilteraction = (arg) => async dispatch => {
    try {
        const response = await axios.post('https://restaurantappbackend.onrender.com/api/food/filter',arg)
        dispatch({type:GET_FOODS , payload : response.data.foods})
    } catch (error) {
        console.log("getfoods by filter error is : ",error)
    }
}
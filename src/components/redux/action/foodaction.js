import { GET_FOODS , GET_FOOD , ADD_food , DELETE_FOOD } from "../constant/foodconstant";
import {SHOW_SUCCESS_MESSAGE , SHOW_ERROR_MESSAGE} from '../constant/messagesconstant'
import {START_LOAD,END_LOAD} from '../constant/loadingconstant'
import axios from "axios";
import { useHistory } from "react-router-dom";

export const getfoodaction = () => async dispatch => {
    try {
        dispatch({type:START_LOAD})
        const response = await axios.get('https://restaurantappbackend.onrender.com/api/food/readall')
        dispatch({type:END_LOAD})
        dispatch({type:GET_FOODS , payload : response.data.foods})
    } catch (error) {
        console.log(error)
        dispatch({type:END_LOAD})
    }
}

export const getspecificfoodaction = (foodId) => async dispatch => {
    try {
        dispatch({type:START_LOAD})
        const response = await axios.get(`https://restaurantappbackend.onrender.com/api/food/${foodId}`)
        dispatch({type:END_LOAD})
        dispatch({type:GET_FOOD , payload : response.data.food})
    } catch (error) {
        dispatch({type:END_LOAD})
        console.log("get food error is = ",error)
    }
}

export const addfoodaction = (formdata) => async dispatch => {
    try {
        dispatch({type:START_LOAD})
        const response = await axios.post('https://restaurantappbackend.onrender.com/api/food/add',formdata)
        dispatch({type:END_LOAD})
        dispatch({type:SHOW_SUCCESS_MESSAGE , payload : response.data.successMessage})
        dispatch({type:ADD_food , payload : response.data.newfood})
    } catch (error) {
        dispatch({type:END_LOAD})
        console.log("add food error is = ",error)
        dispatch({type:SHOW_ERROR_MESSAGE , payload : error.response.data.errorMessage})
    }
}

export const deletefoodaction = foodId => async dispatch => {
    try {
        dispatch({type:START_LOAD})
        const response = await axios.delete(`https://restaurantappbackend.onrender.com/api/food/delete/${foodId}`)
        dispatch({type:DELETE_FOOD , payload : response.data})
        dispatch({type:END_LOAD})
    } catch (error) {
        console.log("delete food error is = ",error)
        dispatch({type:SHOW_ERROR_MESSAGE , payload : error.response.data.errorMessage})
    }
}
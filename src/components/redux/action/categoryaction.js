import {GET_CATEGORIES , ADD_CATEGORY} from '../constant/categoryconstant'
import {START_LOAD , END_LOAD} from '../constant/loadingconstant'
import {SHOW_ERROR_MESSAGE , SHOW_SUCCESS_MESSAGE} from '../constant/messagesconstant'
import axios from 'axios'

export const getcategoriesaction = () => async (dispatch) => {
    try {
        dispatch({type : START_LOAD});
        const response = await axios.get('https://restaurantappbackend.onrender.com/api/category/readall');
        dispatch({type:END_LOAD});
        dispatch({type:GET_CATEGORIES, payload : response.data.categories});
    } catch (error) {
        console.log("dispatch get categories error is = ",error)
        dispatch({type:END_LOAD})
        dispatch({type:SHOW_ERROR_MESSAGE , payload : error.response.data.errorMessage})
    }
}

export const createcategoryaction = (formdata) => async (dispatch) => {
    try {
        const config = {
            headers : {
                'content-type' : 'application/json'
            }
        }
        dispatch({type:START_LOAD})
        const response = await axios.post('https://restaurantappbackend.onrender.com/api/category/add',formdata , config)
        dispatch({type:END_LOAD})
        dispatch({type:ADD_CATEGORY , payload : response.data})
        dispatch({type:SHOW_SUCCESS_MESSAGE , payload : response.data.successMessage})
    } catch (error) {
        console.log("dispatch post category error is = ",error)
        dispatch({type:END_LOAD})
        dispatch({type:SHOW_ERROR_MESSAGE , payload : error.response.data.errorMessage})
    }
}
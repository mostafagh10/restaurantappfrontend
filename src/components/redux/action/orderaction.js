import { ADD_SHIPPING_DETAILS , ADD_PAYMENT_DETAILS , VIEW_ORDERS , CLEAR_ORDER } from "../constant/orderconstant";
import { START_LOAD , END_LOAD } from "../constant/loadingconstant";
import axios from "axios";

export const saveshippingdetails = data => async dispatch => {
    dispatch({type:ADD_SHIPPING_DETAILS , payload : data})

    localStorage.setItem('shipping',JSON.stringify(data))
}

export const savepaymentdetails = data => async dispatch => {
    dispatch({type:ADD_PAYMENT_DETAILS , payload : data})

    localStorage.setItem('paymentmethod',JSON.stringify(data))
}

export const viewordersprocess = () => async dispatch => {
    try{
    dispatch({type:START_LOAD})
    const response = await axios.get('https://restaurantappbackend.onrender.com/api/order')
    dispatch({type:END_LOAD})
    dispatch({type:VIEW_ORDERS , payload : response.data.orders})
 }catch (error) {
    console.log(error)
    dispatch({type:END_LOAD})
}
}

export const clearorder = () => async dispatch => {
    dispatch({type:CLEAR_ORDER})
}
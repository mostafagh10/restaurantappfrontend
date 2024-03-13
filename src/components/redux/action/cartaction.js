import {ADD_TO_CART , DELETE_FROM_CART , CLEAR_CART} from '../constant/cartconstant'

export const addtocart = (product) => async dispatch => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
    : [];

    const duplicates = cart.filter(cartitem => cartitem._id === product._id);

    if(duplicates.length === 0){
        const producttoadd = {
            ...product,
            count :1
        }

        cart.push(producttoadd);

        localStorage.setItem('cart' , JSON.stringify(cart));

        dispatch({type:ADD_TO_CART , payload : cart})
    }
}

export const deletefromcart = (product) => async dispatch => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
    : [];

    const updatedcart = cart.filter(p => p._id !== product._id)

        localStorage.setItem('cart' , JSON.stringify(updatedcart));

        dispatch({type:DELETE_FROM_CART , payload : updatedcart})
    
}

export const clearcart = () => async dispatch => {
        dispatch({type:CLEAR_CART})
    
}
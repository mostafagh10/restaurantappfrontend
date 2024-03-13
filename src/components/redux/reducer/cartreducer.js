import {ADD_TO_CART , DELETE_FROM_CART , CLEAR_CART} from '../constant/cartconstant'

const INITIAL_STATE = {
    cart : []
}

if (localStorage.getItem('cart')){
    INITIAL_STATE.cart = JSON.parse(localStorage.getItem('cart'))
} else {
    INITIAL_STATE.cart = [];
}

const cartreducer = (state=INITIAL_STATE , action) => {
    switch(action.type){
        case ADD_TO_CART:
            return{
                cart : [...action.payload]
            };
        case DELETE_FROM_CART:
            return{
                cart : [...action.payload]
            };
         case CLEAR_CART:
            return{
                cart : []
            };
        default:
            return state;
    }
}

export default cartreducer;
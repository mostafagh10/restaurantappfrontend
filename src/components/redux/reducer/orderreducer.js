import {ADD_SHIPPING_DETAILS , ADD_PAYMENT_DETAILS , VIEW_ORDERS , CLEAR_ORDER} from '../constant/orderconstant'

const INITITAL_STATE = {
    shipping : {},
    paymentmethod:'',
    orders:[],
}

export const orderreducer = (state = INITITAL_STATE , action) => {
    switch(action.payload){
        case ADD_SHIPPING_DETAILS:
            return{
                ...state,
                shipping : action.payload,         
            }
        case ADD_PAYMENT_DETAILS:
            return{
                ...state,
                paymentmethod : action.payload,         
            }
        case VIEW_ORDERS:
            return{
                ...state,
                orders : action.payload,
            }
        case CLEAR_ORDER:
            return{
                shipping : {},
                paymentmethod:'',        
            }
        default :
            return state;
    }
}

export default orderreducer

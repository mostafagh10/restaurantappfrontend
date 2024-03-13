import { SHOW_ERROR_MESSAGE , SHOW_SUCCESS_MESSAGE , CLEAR_MESSAGE} from '../constant/messagesconstant'

const INITIAL_STATE = {
    successmsg: '',
    errormsg : ''
}

const messagereducer = (state=INITIAL_STATE , action) => {
    switch (action.type){
        case SHOW_ERROR_MESSAGE :
            return{
                ...state,
                errormsg:action.payload
         }
         case SHOW_SUCCESS_MESSAGE :
            return{
                ...state,
                successmsg:action.payload
         }
         case CLEAR_MESSAGE :
            return{
                errormsg:'',
                successmsg:''
         }
         default :
         return state
    }
}

export default messagereducer
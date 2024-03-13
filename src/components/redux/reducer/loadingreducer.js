import {START_LOAD , END_LOAD} from '../constant/loadingconstant'

const INTITIAL_STATE = {
    loading : false,
}

const loadingreducer = (state = INTITIAL_STATE , action) => {
    switch (action.type){
        case START_LOAD:
            return{
                loading : true
            }
        case END_LOAD:
            return{
                loading : false
            }
        default:
            return state;
    }
}

export default loadingreducer
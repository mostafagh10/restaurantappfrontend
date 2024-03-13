import {FILTER_FOODS} from '../constant/filterconstant'

const INITIAL_STATE = {
    newsArrival : []
}

export const filterreducer = (state = INITIAL_STATE  , action) => {
    switch (action.type){
        case FILTER_FOODS:
            return{
                newsArrival: [...action.payload],
            };
        default:
            return state;
    }
}
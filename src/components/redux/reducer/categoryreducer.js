import {GET_CATEGORIES , ADD_CATEGORY} from '../constant/categoryconstant'

const INITIAL_STATE = {
    categories : [],
}

const getcategoriesreducer = (state = INITIAL_STATE , action) => {
    switch(action.type){
        case GET_CATEGORIES:
            return{
                ...state,
                categories : action.payload,
            };
        case ADD_CATEGORY:
            return{
                ...state,
                categories : [...state.categories , action.payload ]
            };
        default :
        return state
    }
}

export default getcategoriesreducer
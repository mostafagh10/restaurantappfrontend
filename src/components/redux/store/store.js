import { combineReducers , applyMiddleware , createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import loadingreducer from '../reducer/loadingreducer';
import messagereducer from '../reducer/messagesreducer';
import getcategoriesreducer from '../reducer/categoryreducer';
import { foodreducer } from '../reducer/foodreducer';
import {filterreducer} from '../reducer/filterreducer';
import cartreducer from '../reducer/cartreducer'
import orderreducer from '../reducer/orderreducer';

const reducer = combineReducers({
    loading : loadingreducer,
    messages : messagereducer,
    categories : getcategoriesreducer,
    foods : foodreducer,
    filters:filterreducer,
    cart : cartreducer,
    order : orderreducer,
});

const initialstate = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialstate,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;
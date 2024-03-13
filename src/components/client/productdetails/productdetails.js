import React , {useEffect} from 'react';
import {useParams , useHistory} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getspecificfoodaction } from '../../redux/action/foodaction'
import { addtocart } from '../../redux/action/cartaction';
import { Showloading } from '../../helpers/loading';


const ProductDetails = () => {
    const foodId = useParams().foodId;
    let history = useHistory();
    const dispatch = useDispatch();
    const {food} = useSelector(state => state.foods);
    const {loading} = useSelector(state => state.loading)

    useEffect(() => {
            dispatch(getspecificfoodaction(foodId))
    },[dispatch , foodId])

    const gobackfunction = () => {
        history.goBack();
    }

    const addtocartfunction = () => {
        dispatch(addtocart(food));
    }


    return(
        <div className='m-4'>
            <button className='btn btn-light mb-4' onClick={gobackfunction}>go back</button><br />
            {loading && Showloading()}
            {food && 
            <div className='row'>
                <div className='col-md-6 mb-4'>
                    <img src={food.foodimage} width='100%' height='450px' />
                </div>
                <div className='col-md-6'>
                {loading && Showloading()}
                    <h3>{food.foodname}</h3>
                    <p className='text-muted border-top'>price : $ {food.price}</p>
                    <p className='text-muted border-top'>decription : {food.description}</p>
                    <p className='text-muted border-top'>status : {food.quantity <= 0 ? 'outstock' : 'instock'}</p>
                    <button className='btn btn-dark btn-large btn-block mt-2' disabled={food.quantity <= 0} onClick={addtocartfunction}>
                        add to cart
                    </button>
                </div>
            </div>
            }
        </div>
    )
}

export default ProductDetails;
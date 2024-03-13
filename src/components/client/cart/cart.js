import React from "react";
import { useSelector , useDispatch } from "react-redux";
import { Link , useHistory } from "react-router-dom";
import { ADD_TO_CART } from "../../redux/constant/cartconstant";
import { deletefromcart } from "../../redux/action/cartaction";
import { getcookie , get } from "../../helpers/cookieprocesses";
import { getLocalStorage } from "../../helpers/localstorageproecesses";

const Cart = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {cart} = useSelector(state => state.cart)

    const handleqtychange = (e,food) => {
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        cart.forEach(cartitem => {
            if(cartitem._id === food._id){
                cartitem.count = e.target.value
            }
        });
        localStorage.setItem('cart',JSON.stringify(cart))

        dispatch({type:ADD_TO_CART , payload:cart})
    }

    const handlecheckout = (e) => {
        if(!getcookie('token') && !getLocalStorage('user')){
            history.push('/login?redirect=shipping');
        }else{
            history.push('/shipping')
        }
    }
    
    return(
        <div className="shoppage">
            <div className="jumbotron">
                <h1 className="display-4" style={{fontWeight:'500'}}>{cart.length >0 ? 'cart' : 'your cart is empty'}</h1>
            </div>
            <div className="row">
                <div className="col-md-8">
                  <table className="table">
                  <thead>
                    <tr>
                    <th scope="col"></th>
                    <th scope="col">product</th>
                    <th scope="col">price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">remove</th>
                    </tr>
                   </thead>
                   <tbody>
                   {cart && cart.map(food => {
                    return(
                    <tr key={food._id}>
                     <th scope="row"><img src={food.foodimage} width='100' height='100' /></th>
                     <td><Link to={`/product/${food._id}`} style={{color:'black'}}>{food.foodname}</Link></td>
                     <td>{food.price}$</td>
                     <td><input type="number" value={food.count} min='1' max={food.quantity} onChange={e => handleqtychange(e,food)} /></td>
                     <td><button onClick={() => dispatch(deletefromcart(food))} className="btn btn-danger">x</button></td>
                   </tr>
                    )
                   })}
                   </tbody>
                   </table>
                </div>
                <div className="col-md-4 border-left pl-4">
                    <h2>cart summary</h2>
                    <p className="text-muted border-bottom">cart items : {cart.length}</p>
                    <p className="font-weight-bold">total &nbsp; 
                        {cart.reduce((currentsum,currentcartitem) =>
                        currentsum + currentcartitem.count * currentcartitem.price , 0                       
                        ).toFixed(2)} $
                    </p>
                    <button disabled={cart.length <= 0} onClick={handlecheckout} className='btn btn-dark btn-large btn-block mb-5 py-2'>
                        proceed to checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;
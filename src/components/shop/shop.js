import React , {useState,useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import {getfoodaction} from '../redux/action/foodaction'
import { getcategoriesaction } from '../redux/action/categoryaction';
import { postfoodsbyfilteraction } from '../redux/action/filteraction'
import { addtocart } from '../redux/action/cartaction';
import {Showloading} from '../helpers/loading'
import './shop.css'

const Shop = () => {
    const dispatch = useDispatch();
    const {foods} = useSelector(state => state.foods)
    const {categories} = useSelector(state => state.categories)
    const {loading} = useSelector(state => state.loading)

    useEffect(() => {
       dispatch(getcategoriesaction());
    },[dispatch])


    useEffect(() => {
        dispatch(getfoodaction());
    },[dispatch])

    /*  for handle the change of text search   */
    const [text , settext] = useState('')

    const handlechange = (e) => {
       settext(e.target.value)
       dispatch(postfoodsbyfilteraction({type:'text',query:e.target.value}))
    }

    const [categorynames , setcategorynames] = useState([])

    const handlechange2 = (e) => {
       const currentcategorychecked = e.target.value;
       const allcategorieschecked = [...categorynames]
       const indexfound = allcategorieschecked.indexOf(currentcategorychecked)

       let updatedcategorynames;
       if(indexfound == -1){
        //add
        updatedcategorynames = [...categorynames , currentcategorychecked];
        setcategorynames(updatedcategorynames);
       }
       else{
        //remove
        updatedcategorynames = [...categorynames];
        updatedcategorynames.splice(indexfound,1);
        setcategorynames(updatedcategorynames)
       }
       dispatch(postfoodsbyfilteraction({type:'category',query:updatedcategorynames}))
    }

    
    return(
        <div className="shoppage">
            <div className="jumbotron">
                <h1 className="display-4" style={{fontWeight:'500'}}>shop</h1>
            </div>
            <div className="row">
                {/* filter part */}
                <div className="col-md-3 border-right">
                    <h5 className='text-muted'>filter <span className='fas fa-sliders-h'></span></h5>
                    <form className='form-inline bg-light my-2 my-lg-0' style={{padding:'10px'}}>
                        <input className='form-control mr-sm-2' value={text} onChange={handlechange}  style={{width:'70%'}} placeholder='search' />
                        <input type='submit'className='btn btn-outline-success my-2 my-sm-0' value='search' style={{width:'25%',marginLeft:'3px'}} />
                    </form>

                    <div className='border-top border-bottom bg-light p-3'>
                        {categories && categories.map(category => {
                            return(
                            <div key={category._id}>
                              <div className="form-check">
                              <input className="form-check-input" type="checkbox" onChange={handlechange2} value={category.categoryname} id="defaultCheck1" />
                              <label className="form-check-label" htmlFor="defaultCheck1">
                                 {category.categoryname}
                              </label>
                              </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                {/* products part */}
                <div className="col-md-9">
                    {loading && Showloading()}
                    <div className='row'>
                        {foods && foods.map(food => {
                       return(
                        <div className="col-md-4" key={food._id}>
                            <div className="card managefoodcard">
                            <div className="card-img-top">
                                <img src={food.foodimage} height="230" width="100%" />
                            </div>
                            <div className="card-body managefoodtext">
                            <div className="card-title">
                            <h5>
                            {food.foodname}
                            </h5>
                            </div><hr style={{width:'80%'}} />
                            <div className="card-text">
                            {food.price} $<br />
                            {food.quantity <=0 ? 'outstock' : 'instock'}<br />
                            <h6>{food.description}</h6>
                            </div>
                            </div>
                            <div className="card-body filterbuttons">
                                <Link to={`/product/${food._id}`}>
                                <button className="btn btn-warning">
                                    view product
                                </button>
                                </Link>
                                <button className="btn btn-primary" disabled={food.quantity <= 0} onClick={() => dispatch(addtocart(food))}>
                                add to card
                                </button>
                            </div>
                            </div>
                        </div>
                        )
                    })}              
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;
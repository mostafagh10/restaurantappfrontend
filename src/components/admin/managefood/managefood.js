import React , {useEffect , useState} from "react";
import { Successmessage } from '../../helpers/message'
import {Link, useHistory} from 'react-router-dom'
//redux
import {useSelector , useDispatch} from 'react-redux'
import {getfoodaction , deletefoodaction} from '../../redux/action/foodaction'
import './managefood.css'
import { Showloading } from "../../helpers/loading";
import axios from "axios";

const Managefood = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading , setloading] = useState(false)
    
    useEffect(()=> {
        dispatch(getfoodaction());
    },[dispatch])
    const {foods} = useSelector(state => state.foods) 

    const makedeleteprocess = async(foodId) => {
        setloading(true);
        await axios.delete(`https://restaurantappbackend.onrender.com/api/food/delete/${foodId}`).then(() => {
          history.push('/')
          history.push('/admin/dashboard')
        }).catch((err) => {
            history.push('/')
            history.push('/admin/dashboard')
        })
      }
    

    const {successmsg} = useSelector(state => state.messages)
    return(
        <div>
            <div className="container">
            {successmsg && Successmessage(successmsg)}
            {loading && Showloading()}
            <div className="row">
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
                    {food.price.toFixed(2)} $<br /><br />
                    <h6>{food.description}</h6>
                    </div>
                    </div>
                    <div className="card-body managefoodbuttons">
                        <button className="btn btn-danger" onClick={() => makedeleteprocess(food._id)}>
                            <i class="fa fa-trash" aria-hidden="true"></i> delete
                        </button>
                        <Link to={`/admin/edit/food/${food._id}`}>
                        <button className="btn btn-secondary">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> edit
                        </button>
                        </Link>
                    </div>
                    </div>
                </div>
                )
            })}
            </div>
            </div>
        </div>
    )
}

export default Managefood
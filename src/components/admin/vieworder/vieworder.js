import React , {useState,useEffect, Fragment} from 'react'
import { Showloading } from '../../helpers/loading'
import axios from 'axios'

const Vieworder = () => {

    const [orders , setorders] = useState(null)
    const [loading , setloading] = useState(false)

    useEffect(async() => {
        setloading(true)
        await axios.get('https://restaurantappbackend.onrender.com/api/order').then((res) => {
            setorders(res.data.orders)
            setloading(false)
        })
        console.log(orders)
    },[])

    return(
        <div id="viewordersmodal" className='modal'>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header bg-success text-white'>
                        <h5 className='modal-title'>view orders</h5>
                        <button className='close' data-dismiss='modal'>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className='modal-body my-2'>
                    {loading && Showloading()}
                    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">user email</th>
      <th scope="col">payment method</th>
      <th scope="col">the items</th>
    </tr>
  </thead>
  <tbody>
                            {orders && orders.map((order,i) => {
                                return(
                                    <tr>
                                    <th scope="row">{i+1}</th>
                                    <td>{order.useremail}</td>
                                    <td>{order.paymentmethod}</td>
                                    <td>{order.orderdetails.map((food) => (
                                        <Fragment>{food.foodname} &nbsp;</Fragment>
                                    ))}</td>
                                    </tr>
                                )
                            })}
  </tbody>
</table>
                    </div>
                    <div className='modal-footer'>
                        <button type='submit' className='btn btn-success' data-dismiss='modal'>close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Vieworder;
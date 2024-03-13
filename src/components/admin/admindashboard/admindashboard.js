import React from 'react'
import AddCategory from '../addcategory/addcategory'
import Addfood from '../addfood/addfood'
import Managefood from '../managefood/managefood'
import Vieworder from '../vieworder/vieworder'
import './admindashboard.css'

const Admindashboard = () =>  {

  const admindashboardheader = () => {
    return(
      <div className="bg-dark text-white py-4" style={{textTransform:'capitalize'}}>
      <div className='container'>
        <div className='row'>
          <h1>
          <i className="fa fa-home" aria-hidden="true"></i> admin dashboard
          </h1>
        </div>
      </div>
    </div>
    )
  }

  const admindashboardbuttons = () => {
    return(
      <div className="bg-light">
      <div className='container'>
        <div className='row adminbuttonsection'>
         <div className='col-md-4 adminbutton'>
          <button className='btn btn-outline-info' data-toggle='modal' data-target='#addcategorymodal'>
            <i className="fa fa-plus" aria-hidden="true"></i> add category
          </button>
         </div>
         <div className='col-md-4 adminbutton'>
          <button className='btn btn-outline-danger' data-toggle='modal' data-target='#addfoodmodal'>
            <i className="fa fa-plus" aria-hidden="true"></i> add food
          </button>
         </div>
         <div className='col-md-4 adminbutton'>
          <button className='btn btn-outline-success' data-toggle='modal' data-target='#viewordersmodal'>
          <i className="fa fa-credit-card" aria-hidden="true"></i> view orders
          </button>
         </div>
        </div>
      </div>
    </div>
    )
  }

  return (
   <div>
    
    {admindashboardbuttons()}
    {Managefood()}
    {AddCategory()}
    {Addfood()}
    {Vieworder()}
   </div>
  );
}

export default Admindashboard;

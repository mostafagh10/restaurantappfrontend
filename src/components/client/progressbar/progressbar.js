import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Progressbar = ({step1 , step2 , step3}) => {
    return(
        <>
            <nav aria-label="breadcrumb" style={{fontWeight:'500'}}>
            <ol className="breadcrumb">
            {step1 ? (

                <li className="breadcrumb-item active" aria-current='page'><Link to="/shipping" style={{color:'rgb(1, 137, 179)',fontWeight:'bold'}}>shipping</Link></li>
          
            ) : (

                  <li className="breadcrumb-item">
                    <Link to="/#"
                  onClick={(e) => e.preventDefault()} style={{textDecoration:'none',cursor:'not-allowed'}} className="text-muted">shipping</Link></li>
            
            )}

{step2 ? (

<li className="breadcrumb-item active" aria-current='page'><Link to="/payment" style={{color:'rgb(1, 137, 179)',fontWeight:'bold'}}>payment</Link></li>

) : (

  <li className="breadcrumb-item">
    <Link to="/#"
  onClick={(e) => e.preventDefault()} style={{textDecoration:'none',cursor:'not-allowed'}} className="text-muted">payment</Link></li>

)}

{step3 ? (

<li className="breadcrumb-item active" aria-current='page'><Link to="/placeorder" style={{color:'rgb(1, 137, 179)',fontWeight:'bold'}}>place order</Link></li>

) : (

  <li className="breadcrumb-item">
    <Link to="/#"
  onClick={(e) => e.preventDefault()} style={{textDecoration:'none',cursor:'not-allowed'}} className="text-muted">place order</Link></li>

)}




            </ol>
            </nav>
        </>
    )
}

export default Progressbar;
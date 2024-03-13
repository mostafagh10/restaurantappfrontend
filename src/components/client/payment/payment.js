import React, { useEffect, useState } from "react";
import Progressbar from "../progressbar/progressbar";
import { useDispatch , useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savepaymentdetails } from "../../redux/action/orderaction";

const Payment = () => {
    let dispatch = useDispatch();
    let history = useHistory();
    const [paymenttype , setpaymenttype] = useState('stripe')

    useEffect(() => {
        const thepayment = JSON.parse(localStorage.getItem('paymentmethod'));
        console.log("payment = ",thepayment)
        thepayment ? setpaymenttype(thepayment) : setpaymenttype('stripe')
    },[localStorage])

    const handlechange = (e) => {
        setpaymenttype(e.target.value)
    }

    const handlesubmit = (e) => {
        e.preventDefault();
        dispatch(savepaymentdetails(paymenttype));
        history.push('/placeorder')
    }
    return(
        <div className="m-4">
            <div className="jumbotron p-1">
            <Progressbar step1 step2 />
            </div>
            <div className="container border py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h6 className="font-weight-bold mb-4">
                            payment
                        </h6>

                        <form onSubmit={handlesubmit}>
                            <div className="form-check">
                                <input className="form-check-input"
                                type="radio"
                                name="paymentmethod"
                                value='paypal'
                                onChange={handlechange}
                                checked={paymenttype === 'paypal'} />
                                <label className="form-check-label">paypal</label>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input"
                                type="radio"
                                name="paymentmethod"
                                value='stripe'
                                onChange={handlechange}
                                checked={paymenttype === 'stripe'} />
                                <label className="form-check-label">stripe</label>
                            </div>
                            <button className="btn btn-primary mt-3" type="submit">continue</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Payment;
import React, { useEffect, useState } from "react";
import Progressbar from "../progressbar/progressbar";
import axios from 'axios'
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from "./checkoutform/checkoutform";

const stripePromise = loadStripe(process.env.REACT_APP_BUPLISHABLE_STRIPE_KEY)

const Placeorder = () => {

    const [clientsecret , setclientsecret] = useState('');

    const calculatecarttotal= () => {
        // get cart from localstroage
        const cart = JSON.parse(localStorage.getItem('cart'))
        //calclate cart total
        let carttotal = cart.reduce((currentsum,currentcartitem) => {
        return currentsum + currentcartitem.count * currentcartitem.price ;                       
        },0);
        carttotal = carttotal.toFixed(2)*10;
        console.log(carttotal)
        return carttotal;
    }

    const getpaymentintent = async () => {
        const carttotal = calculatecarttotal();

        const res = await axios.post('https://restaurantappbackend.onrender.com/api/payment/payment-intent',{
            total : carttotal
        })
        setclientsecret(res.data.clientsecret);
        console.log(clientsecret);
    }

    useEffect(() => {
        getpaymentintent();
    },[])

    const options = {
        clientSecret : clientsecret,
        apperance : {
            theme:'stripe'
        },
    }

    return(
        <div className="m-4">
            <div className="jumbotron p-1">
            <Progressbar step1 step2 step3 />
            </div>
            <div className="container border py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h6 className="font-weight-bold mb-4">
                            place order
                        </h6>
                        {clientsecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Placeorder;
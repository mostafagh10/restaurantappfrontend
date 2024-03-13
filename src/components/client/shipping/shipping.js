import React , {useState , useEffect} from "react";
import Progressbar from "../progressbar/progressbar";
import {useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom";
import { saveshippingdetails } from "../../redux/action/orderaction";

const Shipping = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [address , setaddress] = useState('');
    const [address2 , setaddress2] = useState('');
    const [city , setcity] = useState('');
    const [state , setstate] = useState('');
    const [zip , setzip] = useState('');

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('shipping'));
        console.log("items = ",items)
        items ? setaddress(items.address) : setaddress('')
        items ? setaddress2(items.address2) : setaddress2('')
        items ? setcity(items.city) : setcity('')
        items ? setstate(items.state) : setstate('')
        items ? setzip(items.zip) : setzip('')
    },[localStorage])

    const handlesubmit = (e) => {
        e.preventDefault();
        const formdata = { address,address2 , city , state , zip }
        console.log(formdata)
        dispatch(saveshippingdetails(formdata))
        history.push('/payment')
    }
    return(
        <div className="m-4">
            <div className="jumbotron p-1">
            <Progressbar step1 />
            </div>
            <div className="container border py-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h6 className="font-weight-bold mb-4">
                            shipphing details
                        </h6>

                        <form onSubmit={handlesubmit}>
                            <div className="form-group">
                                <label htmlFor="inputaddress">address</label>
                                <input type="text" className="form-control"
                                placeholder="Address" 
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="inputaddress2">address 2</label>
                                <input type="text" className="form-control"
                                placeholder="Apartment number,suite,unit,etc"
                                value={address2}
                                onChange={(e) => setaddress2(e.target.value)}
                                />
                            </div>

                            <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputcity">city</label>
                                <input type="text" className="form-control"
                                value={city}
                                onChange={(e) => setcity(e.target.value)} />
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="inputstate">state</label>
                                <input type="text" className="form-control"
                                value={state}
                                onChange={(e) => setstate(e.target.value)} />
                            </div>

                            <div className="form-group col-md-2">
                                <label htmlFor="inputzip">zip</label>
                                <input type="text" className="form-control"
                                value={zip}
                                onChange={(e) => setzip(e.target.value)}
                                />
                            </div>
                            </div>
                        <button className="btn btn-primary" type="submit">continue</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Shipping;
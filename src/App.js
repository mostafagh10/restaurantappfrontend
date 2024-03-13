import React , {Component , useEffect} from 'react'
import Nav from './components/navbar/navbar';
import Home from './components/home/home';
import Shop from './components/shop/shop';
import Cart from './components/client/cart/cart';
import Shipping from './components/client/shipping/shipping';
import Payment from './components/client/payment/payment';
import Placeorder from './components/client/placeorder/placeorder'
import Signup from './components/signup/signup';
import signin from './components/signin/signin';
import Notfount from './components/notfount/notfount';
import Admindashboard from './components/admin/admindashboard/admindashboard';
import Clientdashboard from './components/client/clientdashboard/clientdashboard';
import ProductDetails from './components/client/productdetails/productdetails';
import Editfood from './components/admin/editfood/editfood';
import {BrowserRouter, Switch , Route} from 'react-router-dom'
import AdminRoute from './protectRoutes/adminRoute';
import UserRoute from './protectRoutes/userRoute';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/cart" component={Cart} />
        <UserRoute exact path="/shipping" component={Shipping} />
        <UserRoute exact path="/payment" component={Payment} />
        <UserRoute exact path="/placeorder" component={Placeorder} />
        <Route exact path="/product/:foodId" component={ProductDetails} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={signin} />
        <AdminRoute exact path="/admin/dashboard" component={Admindashboard} />
        <AdminRoute exact path="/admin/edit/food/:foodId" component={Editfood} />
        <UserRoute exact path="/user/dashboard" component={Clientdashboard} />
        <Route component={Notfount} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

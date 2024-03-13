import React , {Component , Fragment} from 'react'
import {Link , withRouter} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { getcookie , deletecookie } from '../helpers/cookieprocesses'
import { getLocalStorage , deleteLocalStorage} from '../helpers/localstorageproecesses'
import './navbar.css'

const Nav =() => {
  let history = useHistory();
  const {cart} = useSelector(state => state.cart)

  const logoutfun = (e) => {
    e.preventDefault();
    deleteLocalStorage('user');
    deletecookie('token');
    history.push('/login')
  }
  return (
    <div className="Nav">
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <Link className="navbar-brand" to="/"><img src="./img/logo.png" alt="Food Lover Logo" /></Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
    {!getcookie('token') && (
      <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/shop"><i className="fa fa-shopping-bag" aria-hidden="true"></i> shop</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart"><i className="fa fa-cart-plus" aria-hidden="true"></i> cart <span>{cart.length}</span></Link>
      </li>
      </Fragment>
    )}
      {(getcookie('token')) && (getLocalStorage('user').role === 1 ) && (
         <li className="nav-item">
         <Link className="nav-link" to="/admin/dashboard"><i className="fa fa-home" aria-hidden="true"></i> admin dash</Link>
       </li>
      )}
       {(getcookie('token')) && (getLocalStorage('user').role === 0) && (
        <Fragment>
       <li className="nav-item">
        <Link className="nav-link" to="/"><i className="fa fa-home" aria-hidden="true"></i> Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/shop"><i className="fa fa-shopping-bag" aria-hidden="true"></i> shop</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/cart"><i className="fa fa-cart-plus" aria-hidden="true"></i> cart <span>{cart.length}</span></Link>
      </li>
       </Fragment>
      )}
    {!getcookie('token') && (
      <Fragment>
      <li className="nav-item">
      <Link className="nav-link" to="/signup"><i className="fa fa-user-plus" aria-hidden="true"></i> sign up
      </Link>
      </li>
      <li className="nav-item">
      <Link className="nav-link" to="/login">
      <i class="fa fa-arrow-circle-right" aria-hidden="true"></i> log in
       </Link>
       </li>
      </Fragment>
    )} 
     {getcookie('token') && (
      <li className="nav-item">
      <Link  className="nav-link" onClick={logoutfun}>
      <i class="fa fa-arrow-circle-left" aria-hidden="true"></i> log out
      </Link>
      </li>
    )} 
    </ul>

   
  </div>
</nav>
</div>
  );
}

export default withRouter(Nav);

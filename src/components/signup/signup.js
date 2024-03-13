import React , { useState , useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { Errormessage , Successmessage } from '../helpers/message'
import { Showloading } from '../helpers/loading'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import equals from 'validator/lib/equals'
import { Signupfun } from '../../api/auth'
import { setcookie , getcookie } from '../helpers/cookieprocesses'
import { setLocalStorage , getLocalStorage} from '../helpers/localstorageproecesses'
import {Signuppagebackground} from './style.js'
import './signup.css'

const Signup = () =>  {
  let history = useHistory();

  useEffect(() => {
    if(getcookie('token') && getLocalStorage('user').role === 1){
      history.push('/admin/dashboard')
    }else if(getcookie('token') && getLocalStorage('user').role === 0){
      history.push('/user/dashboard')
    }
},[history])

  const [formdata , setformdata] = useState({
    username : '',
    email : '',
    password : '',
    password2 : '',
    successmsg : false,
    errormsg : false,
    loading : false
  })

  /*      destructuring the state       */
  const {username , email , password , password2 , successmsg , errormsg , loading} = formdata
  
  /*   event handler      */
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    if(isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2)){
      setformdata({
        ...formdata,
        successmsg:'',
        errormsg : 'all fields is required'
      })
    } else if(!isEmail(email)){
      setformdata({
        ...formdata,
        successmsg:'',
        errormsg : 'the email format is invalid'
      })
    } else if (!equals(password , password2)){
      setformdata({
        ...formdata,
        successmsg:'',
        errormsg : 'the passwords doesnt match'
      })
    }else{
      setformdata({
        ...formdata,
        errormsg : '',
        loading: true
      })
      const { username , email , password } = formdata;
      const data = {username , email , password}
      Signupfun(data).then((res) => {
        console.log(res)
        setformdata({
          ...formdata,
          username:'',
          email:'',
          password:'',
          password2:'',
          errormsg:false,
          successmsg:res.data.successMessage,
          loading:false
        })
      }).catch(err => {
        console.log('axios error is ',err)
        setformdata({
          ...formdata,
          errormsg : err.response.data.errorMessage,
          successmsg:false,
          loading:false
        })
      })
    }
  }

  const signupform = () => {
    return(
  <form onSubmit={handlesubmit} className='signupformat'>
  <div className="form-group signupform">
    
    <input type="text" className="form-control" name="username" value={username} placeholder="Enter your username" onChange={handlechange} />
  </div>
  <div className="form-group signupform">
    
    <input type="text" className="form-control" name="email" value={email} placeholder="Enter your email" onChange={handlechange} />
  </div>
  <div className="form-group signupform">
    
    <input type="password" className="form-control" name="password" value={password} placeholder="Enter your Password" onChange={handlechange} />
  </div>
  <div className="form-group signupform">
    
    <input type="password" className="form-control" name="password2" value={password2} placeholder="confirm your Password" onChange={handlechange} />
  </div>
  <button type="submit" className="btn1 btn1-third">sign up</button>
  </form>
    )
  };

  return (
    <Signuppagebackground id="signupsignupbackground">
      <div className='container signupcom'>
      { errormsg && Errormessage(errormsg) }
      { successmsg && Successmessage(successmsg) }
      { loading && Showloading() }
      {signupform()}
      </div>
    </Signuppagebackground>
  );
}

export default Signup;

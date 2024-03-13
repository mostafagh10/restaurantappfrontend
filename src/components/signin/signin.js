import React , { useState , useEffect } from 'react'
import {useHistory , useLocation} from 'react-router-dom'
import { Errormessage } from '../helpers/message'
import { Showloading } from '../helpers/loading'
import { Signinfun } from '../../api/auth'
import { setcookie , getcookie } from '../helpers/cookieprocesses'
import { setLocalStorage , getLocalStorage} from '../helpers/localstorageproecesses'
import './signin.css'
import {Signinpagebackground} from './style.js'

const Signin = ({ location }) =>  {
  let history = useHistory();

  useEffect(() => {
      if(getcookie('token') && getLocalStorage('user').role === 1){
        history.push('/admin/dashboard')
      }else if(getcookie('token') && getLocalStorage('user').role === 0){
        history.push('/')
      }
  },[history])
  const [formdata , setformdata] = useState({
    email : '',
    password : '',
    errormsg : false,
    loading : false
  })

  /*      destructuring the state       */
  const { email , password , errormsg , loading} = formdata
  
  /*   event handler      */
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
      setformdata({
        ...formdata,
        errormsg : '',
        loading: true
      })
      const { email , password } = formdata;
      const data = { email , password}
      Signinfun(data).then((res) => {
        setcookie('token',res.data.token);
        setLocalStorage('user',res.data.user)
        const redirect = location.search.split('=');
        console.log('redirect = ',redirect)
        if(getcookie('token') && getLocalStorage('user')){
          if(getLocalStorage('user').role === 1){
            console.log('redirect to admin')
            history.push('/admin/dashboard')
          }else if (getLocalStorage('user').role === 0 && (redirect.length == 1)){
            console.log('redirect to user')
            history.push('/')
          }else{
            console.log('to shipping page')
            history.push('/shipping')
          }
        }
        setformdata({
          ...formdata,
          email:'',
          password:'',
          errormsg:false,
          loading:false
        })
      }).catch(err => {
        console.log('axios error is ',err)
        setformdata({
          ...formdata,
          errormsg : err.response.data.errorMessage,
          loading:false
        })
      })
  }

  const signinform = () => {
    return(
  <form onSubmit={handlesubmit} className='signinformat'>
  <div className="form-group signinform">
    <input type="text" className="form-control" name="email" value={email} placeholder="Enter your email" onChange={handlechange} />
  </div>
  <div className="form-group signinform">
    <input type="password" className="form-control" name="password" value={password} placeholder="Enter your Password" onChange={handlechange} />
  </div>
  <button type="submit" className="btn1 btn1-third">sign in</button>
  </form>
    )
  };

  return (
    <Signinpagebackground id="signinpbackground">
      <div className='container signincom'>
      { errormsg && Errormessage(errormsg) }
      { loading && Showloading() }
      {signinform()}
      </div>
    </Signinpagebackground>
  );
}

export default Signin;

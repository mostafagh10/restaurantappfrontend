import React from "react";
import {Route,Redirect} from 'react-router-dom'
import {getLocalStorage} from '../components/helpers/localstorageproecesses'

const AdminRoute = ({component : Component, ...rest}) => {
    return(
        <Route
        {...rest}
        render={(props) => 
            getLocalStorage('user') && getLocalStorage('user').role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect to='/login' />
            )
        }
         />
    )
}

export default AdminRoute;
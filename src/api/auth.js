import axios from 'axios'

export const Signupfun = async (data) => {
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://restaurantappbackend.onrender.com/api/auth/signup',data , config)
    return response
}

export const Signinfun = async (data) => {
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://restaurantappbackend.onrender.com/api/auth/signin',data , config)
    return response
}
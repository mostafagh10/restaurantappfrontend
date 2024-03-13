import axios from 'axios'

export const Addorderfun = async (data) => {
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://restaurantappbackend.onrender.com/api/order',data , config)
    return response
}

export const getordersfun = async () => {
    const response = await axios.get('https://restaurantappbackend.onrender.com/api/order')
    return response
}
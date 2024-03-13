import axios from 'axios'

export const Addcategoryfun = async (data) => {
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://restaurantappbackend.onrender.com/api/category/add',data , config)
    return response
}

export const getcategoriesfun = async (data) => {
    const response = await axios.get('https://restaurantappbackend.onrender.com/api/category/readall',data)
    return response
}
import axios from 'axios'

export const Addfoodfun = async (data) => {
    const config = {
        headers : {
            'content-type' : 'application/json'
        }
    }
    const response = await axios.post('https://restaurantappbackend.onrender.com/api/food/add',data , config)
    return response
}

export const getfoodsfun = async () => {
    const response = await axios.get('https://restaurantappbackend.onrender.com/api/food/readall')
    return response
}

export const editfoodprocess = async (data,foodId) => {
    const config = {
        headers:{
            'content-type' : 'application/json'
        }
    }
    const response = await axios.patch(`https://restaurantappbackend.onrender.com/api/food/update/${foodId}` , data , config)
    return response
};
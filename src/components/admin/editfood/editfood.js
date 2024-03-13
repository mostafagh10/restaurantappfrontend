import React , {useEffect, useState} from "react";
import {useParams , Link , useHistory} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {getspecificfoodaction} from '../../redux/action/foodaction'
import { storage } from '../../../firebaseload/index'
import { getcategoriesfun } from '../../../api/admin/categoryapi'
import {editfoodprocess} from '../../../api/admin/foodapi'
import {Errormessage} from '../../helpers/message'

const Editfood = () => {
    const foodId = useParams().foodId;
    let history = useHistory();
    const dispatch = useDispatch();
    const {food} = useSelector(state => state.foods);
    const [formdata, setformdata] = useState({
        foodname:"",
        description:"",
        imagefile:null,
        foodimage:'',
        price:'',
        category:'',
        quantity:'',
        errormsg:null
      });
    useEffect(() => {
        if(!food){
            dispatch(getspecificfoodaction(foodId))
        }
        else{
            setformdata({
                ...formdata,
                foodname : food.foodname,
                description:food.description,
                foodimage:food.foodimage,
                price:food.price,
                category:food.category,
                quantity:food.quantity
            })
        }
    },[dispatch , foodId , food])

    const [categories , setcategories] = useState(null)
    useEffect(() => {
        loadcategories();
    },[])

    const loadcategories = async () => {
        await getcategoriesfun().then(res => {
            setcategories(res.data.categories)
        }).catch(err => {
            console.log('getcategories client side error = ',err)
        });
    }

    //destructure component state
    const {
        foodname,
        description,
        imagefile,
        foodimage,
        price,
        category,
        quantity,
        errormsg
      } = formdata;

      //event handlers

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlechange2 = (e) => {
    if(e.target.files[0]){
      const imagefile = e.target.files[0];
      setformdata({
        ...formdata,
        imagefile:imagefile
      })
    }
  }

  const handleupload = (e) => {
    e.preventDefault();
    const imagefile = formdata.imagefile;
    const uploadtask = storage.ref(`images/${imagefile.name}`).put(imagefile)
    uploadtask.on('state_changed',
    (snapshot) => {

    }, 
    (error) => {
      console.log(error)
    } , 
    () => {
      storage.ref('images').child(imagefile.name).getDownloadURL().then(url => {
        console.log(url);
        setformdata({
          ...formdata,
          foodimage : url
        })
      })
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const {foodname , description , foodimage , price , category , quantity} = formdata;
      const data = {foodname , description , foodimage , price , category , quantity}
      setformdata({
        ...formdata
      })

      editfoodprocess(data,foodId).then((response) => {
        console.log('axios food success' , response)   
        history.push('/admin/dashboard')
    }).catch((err) => {
        setformdata({
            ...formdata,
            errormsg:err.response.data.errorMessage
        })
        console.log(err)
    })
  }

  const Showtheform = () => (
    <div className="container my-3">
    {errormsg && Errormessage(errormsg)}
    <div className="row">
    <div className="col-md-8 mx-auto">
        <Link to="/admin/dashboard">
            <span className="fas fa-arrow-left">GO BACK</span>
        </Link>
    </div>
    <br />
    <div className="col-md-8 mx-auto">
    <div className="modal-content">
      <div className="modal-header bg-danger text-white">
        <h5 className="modal-title">Edit Food</h5>
      </div>
      <form onSubmit={handlesubmit} >
      <div className="modal-body my-2">
        
          <div className="custom-file mb-2">
          <input type="file" className="custom-file-input" onChange={handlechange2} />
          <label className="custom-file-label">choose image</label>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
                <button className="btn btn-danger text-white" onClick={handleupload}>Upload The image</button>
                     </div>
                        {foodimage && 
                        <div className="form-group col-md-6">
                        <img src={foodimage} height="200" width="200" />
                    </div>
                }
          </div>
          <label className='text-secondary'>name</label>
            <input type='text' name="foodname" className='form-control' onChange={handlechange} value={foodname} />
          <label className='text-secondary'>description</label>
            <textarea className='form-control' name="description" onChange={handlechange} value={description}></textarea>
          <label className='text-secondary'>price</label>
            <input type='number' name="price" className='form-control' onChange={handlechange} value={price} />
        <div className='form-row'>
        <div className='form-group col-md-6'>
          <label className='text-secondary'>category</label>
          <select className='form-control' name='category' value={category} onChange={handlechange}>
                {categories && categories.map(category => (
                    <option key={category._id}>{category.categoryname}
             </option>
             ))}
          </select>
        </div>
        <div className='form-group col-md-6'>
            <label className='text-secondary'>quantity</label>
                <input type='number' name="quantity" className='form-control' onChange={handlechange} value={quantity} />
        </div>
        </div>

      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-danger text-white">Save changes</button>
      </div>
      </form>
    </div>
    </div>
  </div>
</div>
)

return(
<div>
    {Showtheform()}
</div>
)
}

export default Editfood
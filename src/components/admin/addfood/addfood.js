import React , {useState,useEffect} from 'react'
import { Errormessage } from '../../helpers/message'
import { Successmessage } from '../../helpers/message'
import { Showloading } from '../../helpers/loading'
import { getcategoriesfun } from '../../../api/admin/categoryapi'
import { Addfoodfun } from '../../../api/admin/foodapi'
import { storage } from '../../../firebaseload/index'
//redux
import {useDispatch, useSelector} from 'react-redux'
import {clear_message} from '../../redux/action/messageaction'
import {addfoodaction} from '../../redux/action/foodaction'

const Addfood = () => {
  const dispatch = useDispatch();
  const {successmsg , errormsg} = useSelector(state => state.messages)
  const {loading} = useSelector(state => state.loading)
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

    const [formdata , setformdata] = useState({
        foodimage:null,
        iamgefile:null,
        foodname : '',
        description:'',
        category:'',
        price:'',
        quantity:''
      })
    
      /*      destructuring the state       */
      const { foodimage , iamgefile , foodname , description , category, price , quantity } = formdata

      /*   event handler      */
  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlemessage = () => {
    dispatch(clear_message());
  }

  const handleimagechange = (e) => {
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
    console.log(formdata)
    e.preventDefault();
      setformdata({
        ...formdata
      })
      const { foodimage , foodname , description , price , category , quantity } = formdata;
      const data = { foodimage , foodname , description , price , category , quantity }
      dispatch(addfoodaction(data))
        setformdata({
          ...formdata,
          foodimage:null,
          foodname:'',
          description:'',
          price:'',
          category:'',
          quantity:''
        })
  }

    return(
        <div id="addfoodmodal" className='modal' onClick={handlemessage}>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header bg-danger text-white'>
                        <h5 className='modal-title'>add food</h5>
                        <button className='close' data-dismiss='modal'>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <form onSubmit={handlesubmit}>
                    {errormsg && Errormessage(errormsg)}
                    {successmsg && Successmessage(successmsg)}
                    {loading && Showloading()}
                    <div className='modal-body my-2'>
                    <div className="custom-file mb-2">
              <input type="file" className="custom-file-input" onChange={handleimagechange} />
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
                            <select className='form-control' name='category' onChange={handlechange}>
                              <option value='' disabled selected hidden>choose the category</option>
                                {categories && categories.map(category => (
                                    <option key={category._id}>{category.categoryname}</option>
                                ))}
                            </select>
                            </div>
                            <div className='form-group col-md-6'>
                              <label className='text-secondary'>quantity</label>
                              <input type='number' name="quantity" className='form-control' onChange={handlechange} value={quantity} />
                            </div>
                            </div>
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-danger'>save</button>
                        <button type='submit' className='btn btn-decondary' data-dismiss='modal'>close</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Addfood;
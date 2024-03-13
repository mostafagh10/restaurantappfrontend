import React , {useState,useEffect} from 'react'
import { Errormessage } from '../../helpers/message'
import { Successmessage } from '../../helpers/message'
import { Showloading } from '../../helpers/loading'
import { Addcategoryfun } from '../../../api/admin/categoryapi'

const AddCategory = () => {

    const [formdata , setformdata] = useState({
        categoryname : '',
        errormsg : false,
        successmsg:false,
        loading : false
      })
    
      /*      destructuring the state       */
      const { categoryname , errormsg , successmsg ,loading} = formdata

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
      const { categoryname } = formdata;
      const data = { categoryname }
      Addcategoryfun(data).then((res) => {
        setformdata({
          ...formdata,
          categoryname:'',
          errormsg:false,
          successmsg : res.data.successMessage,
          loading:false
        })
      }).catch(err => {
        console.log('axios error is ',err)
        setformdata({
          ...formdata,
          successmsg:'',
          errormsg : err.response.data.errorMessage,
          loading:false
        })
      })
  }

    return(
        <div id="addcategorymodal" className='modal'>
            <div className='modal-dialog modal-dialog-centered modal-lg'>
                <div className='modal-content'>
                    <div className='modal-header bg-info text-white'>
                        <h5 className='modal-title'>add category</h5>
                        <button className='close' data-dismiss='modal'>
                        <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>
                    <form onSubmit={handlesubmit}>
                    {errormsg && Errormessage(errormsg)}
                    {successmsg && Successmessage(successmsg)}
                    {loading && Showloading()}
                    <div className='modal-body my-2'>
                            <label className='text-secondary'>category</label>
                            <input type='text' name="categoryname" className='form-control' onChange={handlechange} value={categoryname} />
                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-info'>save</button>
                        <button type='submit' className='btn btn-decondary' data-dismiss='modal'>close</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddCategory;
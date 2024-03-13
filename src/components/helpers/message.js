import React from 'react'

export const Errormessage = (msg) => {
    return(
    <div className='alert alert-danger mt-2' style={{textAlign:'center'}}>
        {msg}
    </div>
    )
}

export const Successmessage = (msg) => {
    return(
    <div className='alert alert-success mt-2' style={{textAlign:'center'}}>
        {msg}
    </div>
    )
}
import React from 'react'

function DisplayStatusComponent({status}) {
    let color
    if(status === 'accepted'){
        color = 'green'
    }else if(status === 'rejected'){
        color = 'red'
    }else{
        color = 'orange'
    }

  return (
    <div style={{color:color}}>{status}</div>
  )
}

export default DisplayStatusComponent

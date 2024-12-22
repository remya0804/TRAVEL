import React from 'react'
import loading from '../assets/loading.gif'

const Loading = () => {
  return (
    <div className='w-full flex justify-center items-center'>
        
        <img className='w-[150px] mt-[120px]' src={loading} alt="" />
    </div>
  )
}

export default Loading
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'

const Hero = () => {

  const {setActiveMenu} = useContext(QuillContext)

  return (
    
    <div className='w-full text-center'> 

      <div className='w-full  m-auto text-[38px] sm:text-[50px] lg:text-[60px] leading-tight text-center font-medium'>
        
        <p>Where words <br className='md:hidden'  /> come  to life <br /> & <br /> ideas unfold.</p>
        
      </div>

      <Link to='/login'>

        <button onClick={() => setActiveMenu("login") } className='bg-green-600 text-white px-5 py-3  sm:px-8 sm:py-4 rounded-full text-sm sm:text-md mt-8'>Start Reading</button>
      
      </Link>

    </div>
  )
}

export default Hero
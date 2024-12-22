import React, { useContext } from 'react'
import { QuillContext } from '../context/QuillContext'
import { Link } from 'react-router-dom'

const CategoryList = () => {

  const {blogCategories} = useContext(QuillContext)

  const allCategories = blogCategories.slice(1,blogCategories.length)

    
  return (
    <div className='w-full flex gap-3 sm:gap-5 mt-12 flex-wrap '>
    {

      allCategories.map((item,idx) => {

        return <Link key={idx} to={`/${item}`}>
        
            <p onClick={() => scrollTo(0,0)} className='bg-gray-800 text-white px-3 py-2 rounded-md text-xs'> {item}</p>

            </Link>
      })
    }

  </div>

  )
}

export default CategoryList
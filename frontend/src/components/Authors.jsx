import React, { useContext, useEffect, useState } from 'react'
import { QuillContext } from '../context/QuillContext'
import { Link } from 'react-router-dom'
import CategoryList from './CategoryList'

const Authors = () => {

  const {allAuthors,userInfo} = useContext(QuillContext)

  const [authorList,setAuthorList] = useState([])

  useEffect(() => {

    if(allAuthors && userInfo){

      const authors =  allAuthors.filter(auth => auth.name !== userInfo.name)

      setAuthorList(authors)
    }
  } ,[userInfo,allAuthors])

  return (

    <div className='w-[90%] sm:w-[70%] text-left  sm:text-center m-auto mt-10 sm:mt-20 mb-24'>
      
      <p className='font-medium text-2xl sm:text-3xl sm:leading-10'><span className='text-pink-600'>{userInfo?.name.split(" ")[0]},</span> read all the best stories  from <br className='hidden lg:block' />skilled authors  on Medium.</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 xs:gap-12 mt-6'>

        {

          authorList.map((author,idx) => {

            return <Link key={idx} to={`/author-stories/${author?.name}`}>
            
                  <div className='flex gap-5  sm:flex-col sm:gap-3 sm:items-center' >

                    {

                      author?.photo

                      ? <img className='sm:w-16 w-14 sm:h-16 h-14 rounded-full ' src={author?.photo} alt="" />

                      : <div className='sm:w-16 w-14 sm:h-16 h-14 rounded-full bg-blue-900 text-white text-center flex items-center justify-center'> 

                          <p className=' bg-transparent sm:text-xl font-semibold'>{ author?.name.slice(0,1)}</p>

                      </div>
                    }

                      

                      <div>

                        <p className=' font-semibold text-md '>{author?.name}</p>

                        {

                          author?.profession && author?.company

                          ? <div>
                              <p className='text-gray-600 text-xs sm:text-sm mt-1'>{author?.profession}</p>

                              <p className='text-gray-600 text-xs sm:text-sm'>{author?.company}</p>

                            </div>

                            : <p className='text-gray-600 text-xs sm:text-sm'>Info Unavailable</p>
                        }

                       

                      </div>

                  </div>

                  </Link>


          })
        }
      </div>

      <CategoryList />

    </div>
  )
}

export default Authors
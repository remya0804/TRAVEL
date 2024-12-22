import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {

  const {userInfo,setUserInfo,backend_url,token,navigate,setToken} = useContext(QuillContext)
  const [loading,setLoading] = useState(true)

  useEffect(() => {

    if(userInfo){

      setLoading(false)
    } else{

      setLoading(true)
    }


  },[userInfo])

  const deleteUser = async () => {

    try {

      const response = await axios.delete(backend_url+ '/api/user/delete-profile',{headers:{token}})

      if(response.data.success){

        toast.success(response.data.message)
        localStorage.removeItem('token')
        setToken("")
        navigate('/')

      }
      
      
    } catch (error) {

      toast.error(error.message)
      
    }
  }

  if(loading) {

    return <Loading />
  }

  return (

    <div className= ' w-full flex flex-col items-center mt-[20px]'>

      {

        userInfo.photo

        ? <img className='w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover' src={userInfo.photo} alt="" />

        : <div className='w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-blue-900 font-3xl flex items-center justify-center'> 

              <p className='text-white bg-transparent font-semibold text-6xl'>{userInfo.name.slice(0,1)}</p>
            
          </div>
      }

      

      <p className='mt-6 text-xl sm:text-2xl font-semibold'>{userInfo.name}</p>

      <p className={`mt-1 text-gray-600 text-xs sm:text-sm ${userInfo.profession ? "block" : "hidden"}`}>{userInfo.profession} || {userInfo.company} </p>

      <div className='flex items-center gap-4'>

        <Link to='/edit-profile'>

          <button className='mt-4 px-8 py-2 rounded-md bg-green-600 text-white sm:text-sm text-xs'>Edit</button>

        </Link>

        <button onClick={deleteUser} className='mt-4 px-8 py-2 rounded-md bg-red-600 text-white sm:text-sm text-xs'>Delete</button>

      </div>
      

    </div>
  )
}

export default Profile
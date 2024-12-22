import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const EditProfile = () => {

    const {userInfo,backend_url,token,navigate} = useContext(QuillContext)

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [currentPassword,setCurrentPassword] = useState("")
    const [profession,setProfession] = useState("")
    const [company,setCompany] = useState("")
    const [photo,setPhoto] = useState("")
    const [image,setImage] = useState("")
    const [loading,setLoading] = useState(true)
    const [removeImage,setRemoveImage] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    

    useEffect(() => {

        if(userInfo){

            setName(userInfo.name)
            setEmail(userInfo.email)
            setProfession(userInfo.profession)
            setCompany(userInfo.company)
            setImage(userInfo.photo)
            setPhoto(userInfo.photo)

            setLoading(false)

        }
    },[userInfo])

    if(loading){

        return <Loading />
    }
    

    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            const formData = new FormData()

            formData.append('name',name !== userInfo.name ? name : userInfo.name)
            formData.append('email',email !== userInfo.email ? email : userInfo.email)
            formData.append('profession',profession !== userInfo.profession ? profession : userInfo.profession)
            formData.append('company',company !== userInfo.company ? company : userInfo.company)
            formData.append('currentPassword',currentPassword)
            formData.append('password',password)
            formData.append('photo',photo !== userInfo.photo ? photo : userInfo.photo)
            formData.append('removeImage',removeImage)

            const response = await axios.post(backend_url + '/api/user/edit-profile',formData,{headers:{token}})

            if(response.data.success){

                toast.success(response.data.message)

                navigate('/profile')

                window.location.reload();

            } else {

                toast.error(response.data.message)
            }
            
            
        } catch (error) {

            toast.error(error.message)
        }
    }

    
  return (

    <div className='w-[90%] sm:w-[80%] m-auto flex flex-col items-center mb-32'>

        <p className='sm:text-3xl text-xl font-semibold'>Profile Information</p>

        <form onSubmit={(e) => submitHandler(e)} className='w-full mt-0 sm:mt-4 flex flex-col items-center'>

            <div className= 'w-full flex flex-col items-center'>

                    <div className='flex items-center gap-5'>

                        {

                            image 
                            
                            ?  <img className='w-16 h-16 sm:w-20 sm:h-20  rounded-full' src={ typeof image == "string" ? image : URL.createObjectURL(image)} alt="" />

                            :

                            <div className='w-16 h-16 sm:w-20 sm:h-20  rounded-full bg-blue-900 font-3xl flex items-center justify-center'> 

                                <p className='text-white bg-transparent font-semibold text-2xl sm:text-4xl'>{userInfo ? userInfo.name.slice(0,1) : ""}</p>

                            </div>
                        }
                       

                        <div className='flex items-center gap-4'>

                            <label htmlFor='profile-pic'>

                                <p className='text-green-600 text-xs sm:text-sm'>Update</p>

                            </label>

                            <input onChange={(e) => {setPhoto(e.target.files[0]),setImage(e.target.files[0])}} type="file" id='profile-pic' hidden />

                            <p onClick={() => {setImage(""),setPhoto(""),setRemoveImage(true)}} className='text-red-600 text-xs sm:text-sm'>Remove</p>
                            
                        </div>

                    </div>

                </div>

                <div className='w-full mt-5 flex flex-col items-center'>

                    <input value={name} onChange={(e) => setName(e.target.value)} className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm' type="text" placeholder='Name' />
                    <input value={email}   onChange={(e) => setEmail(e.target.value)}  className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm' type="email" placeholder='Email' />
                    <input value={profession}  onChange={(e) => setProfession(e.target.value)}  className='mb-3 w-full rounded-md outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm' type="text" placeholder='Profession' />
                    <input value={company}  onChange={(e) => setCompany(e.target.value)}  className='mb-3 w-full rounded-md outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm' type="text" placeholder='Company' />

                    <div className='relative w-full'>

                        <input value={currentPassword}  onChange={(e) => setCurrentPassword(e.target.value)}  className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm'  type={`${showPassword ? "text" : "password" }`} placeholder='Current Password' />
                                
                        {
            
                            showPassword 
                            
                            ? <IoMdEye onClick={() => {setShowPassword(false)}} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500' />
            
                            : <IoMdEyeOff onClick={() => {setShowPassword(true)
                            }} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500'/>
                        }
            
                    </div>
                    <div className='relative w-full'>

                        <input value={password}  onChange={(e) => setPassword(e.target.value)}  className='mb-3 w-full rounded-md outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-3 text-xs sm:text-sm'  type={`${showPassword ? "text" : "password" }`} placeholder='New Password' />

                                
                        {
            
                            showPassword 
                            
                            ? <IoMdEye onClick={() => {setShowPassword(false)}} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500' />
            
                            : <IoMdEyeOff onClick={() => {setShowPassword(true)
                            }} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500'/>
                        }
            
                    </div>
               
                    
                </div>

                <button className='m-auto mt-3 px-8 py-2 rounded-full bg-green-600 text-white sm:text-sm text-xs'>Save</button>            

            
        </form>
        

    </div>
  )
}

export default EditProfile
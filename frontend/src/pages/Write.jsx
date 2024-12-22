import React, { useContext, useState } from 'react'

import { LuImagePlus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { QuillContext } from '../context/QuillContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import AllStories from '../components/AllStories';

const Write = () => {

  const [image,setImage] = useState("")

  const {blogCategories,backend_url,token,navigate} = useContext(QuillContext)

  const [title,setTitle] = useState("")
  const [photo,setPhoto] = useState("")
  const [desc,setDesc] = useState("")
  const [category,setCategory] = useState("")

  

  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      const formData = new FormData()

      formData.append('title',title)
      formData.append('desc',desc)
      formData.append('photo',photo)
      formData.append('category',category)

      const response = await axios.post(backend_url+ '/api/post/add-post',formData,{headers:{token}})

      if(response.data.success){

        toast.success(response.data.message)
        navigate('/')
        window.location.reload()

      }else {

        toast.error(response.data.message)

      }

    } catch (error) {

      toast.error(error.message)
      
      
    }


  } 

  return (

    <form onSubmit={(e) => submitHandler(e)} className='w-[90%] sm:w-[80%] m-auto mb-24 flex flex-col items-center '>

      <div className={`flex ${image ? 'flex-col-reverse sm:flex-col' : 'flex-col-reverse items-center sm:flex-row'} gap-6`}>

        {

          image 

          ? <div className='w-full flex items-end'>

                <img className='w-full h-[120px] sm:h-[200px]' src={URL.createObjectURL(image)} alt="" />

                <MdDelete onClick={() => setImage("")} className='text-2xl sm:text-4xl text-gray-400' />


            </div>


          : <div className='flex gap-10'>

              <div>

                <label htmlFor="story-image">

                  <LuImagePlus className='text-5xl text-gray-400' />

                </label>

                <input onChange={(e) => {setImage(e.target.files[0]),setPhoto(e.target.files[0])}} className='hidden' type="file" id="story-image"/>            

              </div>

            </div>

        }

        <div className='w-full text-center'>

          <input onChange={(e) => setTitle(e.target.value) } className='w-full text-lg sm:text-2xl font-semibold outline-none px-3 py-2  border border-gray-400' type="text" placeholder='Title' />

          <textarea onChange={(e) => setDesc(e.target.value) } className='w-full mt-4 text-sm leading-6 sm:text-lg outline-none h-[200px] px-3 py-2 border border-gray-400' placeholder='Add your story...' />

          <select  onChange={(e) => setCategory(e.target.value) } className='w-full text-sm  outline-none px-3 py-2 text-gray-500  border border-gray-400 mt-3' name="" id="">

            {

              blogCategories.map((item,idx) => {

                return <option key={idx} value={item}>{item}</option>
              })
            }

            


          </select>

        </div>

      </div>

      <div className='w-full text-center mt-4'>

        <button className='m-auto px-8 py-2 rounded-full bg-green-600 text-white sm:text-sm text-xs'>Publish</button>

      </div>


    </form>
  )
}

export default Write
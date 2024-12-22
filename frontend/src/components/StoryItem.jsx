import React, { useContext, useEffect, useState } from 'react'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { QuillContext } from '../context/QuillContext';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


const StoryItem = ({createdDate,id,title,desc,author,authorImage,thumbnail,category,disLikes,likes}) => {

  const {setStoriesArray,location,storiesArray,navigate,userInfo,backend_url,token} = useContext(QuillContext)

  const [likeState,setLikeState] = useState(false)
  const [dislikeState,setDislikeState] = useState(false)

  const [likeCount,setLikeCount] = useState(likes)
  const [dislikeCount,setdisLikeCount] = useState(disLikes)


  useEffect(() => {

    if(storiesArray && userInfo){

      const postData = storiesArray.find(story => story._id === id)

      for(let i in postData.likes){

        if(postData.likes[i].userId == userInfo._id){

          setLikeState(true)

        }else{

          setLikeState(false)
        }
        
      }
      for(let i in postData.disLikes){        

        if(postData.disLikes[i].userId == userInfo._id){

          setDislikeState(true)

        }else{

          setDislikeState(false)
        }
        
      }
    }


  },[storiesArray,userInfo])
  

  const deleteStory = async () => {

    try {

      const response = await axios.delete(backend_url + '/api/post/delete-post',{data: {id},headers:{token}})

      if(response.data.success){

        toast.success(response.data.message)
  
        navigate('/')
  
        window.location.reload()
      }

    } catch (error) {

       toast.error(error.message)   
      
    }
   
    
  }

  const likeUpdate = async (postId) => {

    try {

      const response = await axios.post(backend_url + `/api/post/update-likes/${postId}`,{},{headers:{token}})

      if(response.data.success){

        setLikeCount(response.data.postInfo.likes.length)
        setLikeState(response.data.status)
        setdisLikeCount(response.data.postInfo.disLikes.length)
        setDislikeState(false)
    
        const updatedPost = response.data.postInfo
        setStoriesArray((prevStories) =>
          prevStories.map((story) =>
            story._id === updatedPost._id ? updatedPost : story
          ))
        
      }
    } catch (error) {

      toast.error(error.message)  
    }
  }
  const dislikeUpdate = async (postId) => {

    try {

      const response = await axios.post(backend_url + `/api/post/update-dislikes/${postId}`,{},{headers:{token}})

      if(response.data.success){

        setdisLikeCount(response.data.postInfo.disLikes.length)
        setDislikeState(response.data.status)
        setLikeCount(response.data.postInfo.likes.length)
        setLikeState(false)
        
        const updatedPost = response.data.postInfo
        setStoriesArray((prevStories) =>
          prevStories.map((story) =>
            story._id === updatedPost._id ? updatedPost : story
          ))
      }
    } catch (error) {

      toast.error(error.message)  
    }
  }

  return (

            <div className='flex items-start gap-12 mb-8 sm:mb-10 ' >

                  <div className='flex-1 flex flex-col '>

                      <div className='flex items-center gap-3 text-sm'>

                        {

                          authorImage

                          ? <img src={authorImage} className='sm:w-9 sm:h-9 w-7 h-7 rounded-full ' alt="" />

                          : <div onClick={() => setDropDown(!dropDown)}  className='cursor-pointer sm:w-9 sm:h-9 w-7 h-7 rounded-full bg-blue-900 text-white text-center flex justify-center items-center'> 

                              <p className=' bg-transparent text-md sm:text-xl font-semibold'>{ author ? author.slice(0,1) : ""}</p>

                          </div>
                        }

                        

                        <p className='text-xs sm:text-sm'> <span className='text-gray-500 '>In  </span><Link to={`/${category}`}><span className='text-blue-700' onClick={() => scrollTo(0,0)}>{category}</span></Link> <span className='text-gray-500'>by </span><Link to={`/author-stories/${author}`}><span onClick={() => scrollTo(0,0)} className='text-pink-700'>{author}</span> </Link></p>

                      </div>

                      <img className='sm:hidden mt-2 max-h-[220px]' src={thumbnail} alt="" />

                      <Link to={`/stories/${id}`}>

                        <div className='mt-4 cursor-pointer'>

                          <p className='text-lg sm:text-xl font-bold'>{title}</p>

                          <p className='text-xs sm:text-[15px] mt-2 text-gray-600 leading-5 sm:leading-6'>{(desc).substring(0, 200) + "..."}</p>

                        </div>
                      
                      </Link>

                    
                      <div className='w-[90%] flex gap-6 sm:gap-3 md:gap-12 items-center mt-5 '>

                        <p className='text-xs sm:text-sm text-gray-600'> {createdDate}</p>

                        <div className='flex items-center gap-5 '>

                          <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600'>

                            <FaRegThumbsUp onClick={() => {likeUpdate(id)}} className={`${likeState ? "text-blue-700" : ""}  cursor-pointer`} />
                            <p >{likeCount}</p>

                          </div>
                          <div className='flex items-center text-xs sm:text-sm gap-1 text-gray-600'>

                            <FaRegThumbsDown onClick={() => {dislikeUpdate(id)}} className={`${dislikeState ? "text-blue-700" : ""}  cursor-pointer`}/>
                            <p>{dislikeCount}</p>

                          </div>

                        </div>

                        {

                          userInfo?.name === author

                          ? <div className='flex items-center gap-2'>

                            <Link to={`/edit-story/${id}`}>

                                <MdEditSquare className='text-lg text-green-600  rounded-md sm:hidden block' />

                              </Link>
                              <MdDelete onClick={() => deleteStory()} className='text-lg  text-red-600  rounded-md sm:hidden block' />
                            
                              <Link to={`/edit-story/${id}`}>

                                <button className='text-xs px-5 py-2 bg-green-600 text-white rounded-md sm:block hidden'>Edit</button>

                              </Link>

                              <button onClick={() => deleteStory()} className='text-xs px-3 py-2 bg-red-600 text-white rounded-md sm:block hidden'>Delete</button>

                          </div>

                          : ""
                        }


                      </div>

                      <hr className='h-[1px] bg-gray-300 w-full mt-5 border border-gray-400' />
                
                  </div>


                  <div className=' sm:block hidden'>

                      <img className= 'w-[200px] h-[160px]' src={thumbnail} alt="" />

                  </div>

            </div>

        
  )
}

export default StoryItem
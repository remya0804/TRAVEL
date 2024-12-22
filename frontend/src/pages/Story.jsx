import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'

import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import Loading from '../components/Loading';
import { parseISO, formatDistanceToNow } from 'date-fns';


const Story = () => {

    const {storyId} = useParams()

    const {storiesArray,allAuthors} = useContext(QuillContext)

    const [storyInfo,setStoryInfo] = useState([])
    const [userInfo,setUserInfo] = useState([])

    const [loading,setLoading] = useState(true)


    useEffect(() => {
        if (storiesArray) {
            const story = storiesArray.find(story => story._id === storyId);
            setStoryInfo(story);
            setLoading(false);
        }
    }, [storyId, storiesArray]);

    useEffect(() => {
        if (storyInfo && allAuthors) {
            const authorInfo = allAuthors.find(author => author._id === storyInfo.userId);
            setUserInfo(authorInfo);
            setLoading(false)
        }
    }, [storyInfo, allAuthors]);
    


    if(loading){

        return <Loading />
    }
    
    return (

        <div className='w-[90%] sm:w-[70%] m-auto mb-24 '>
            
            <p className='text-2xl sm:text-4xl font-bold text-gray-900'>{storyInfo?.title}</p>

            <div className='flex items-center mt-5 gap-4'>

                <img className='sm:w-12 w-10 sm:h-12 h-10 rounded-full ' src={userInfo?.photo} alt="" />

                <div>

                    <p className='text-xs font-semibold sm:text-sm'><Link to={`/author-stories/${userInfo?.name}`}> {userInfo?.name}</Link></p>

                    <p className='text-gray-500 mt-1 text-xs sm:text-sm'>Published in <span  className='text-gray-900'><Link to={`/${storyInfo?.category}`}>{storyInfo?.category}</Link></span> </p>

                </div>
            </div>

            <div className='border-t-[1px] border-b-[1px] border-gray-500 py-3 pl-5 my-6 flex items-center gap-10'>

                <p className='text-gray-600 text-xs sm:text-sm'>{storyInfo ? formatDistanceToNow(parseISO(storyInfo.createdDate), { addSuffix: true}).replace("about ", "").replace("about ", "").replace("less than a", 1).replace("minutes","m").replace("hours","h").replace("hour","h").replace("minute","m").replace("months","mo").replace("month","mo").replace("year","y").replace("years","y").replace("days","d").replace("day","d").replace("ago","") : ""}</p>

                <div className='flex items-center gap-1 text-xs sm:text-sm text-gray-600'>

                    <FaRegThumbsUp />
                    <p>{storyInfo?.likes.count ? storyInfo?.likes.count : 0 }</p>

                </div>
                <div className='flex items-center text-xs sm:text-sm gap-1 text-gray-600'>

                    <FaRegThumbsDown />
                    <p>{storyInfo?.disLikes.count ? storyInfo?.disLikes.count : 0}</p>

                </div>

            </div>

            <img className='w-full h-[200px] object-fill' src={storyInfo?.photo} alt="" />

            <p className='mt-8  text-xs sm:text-lg leading-5 sm:leading-7'>{storyInfo?.desc}</p>

            <div className='flex items-center gap-5 mt-14'>

                <img className='sm:w-14 w-12 sm:h-14 h-12 rounded-full ' src={userInfo?.photo} alt="" />

                <div>

                    <p className='text-sm sm:text-lg font-bold'>Written by {userInfo?.name}</p>

                    <p className='text-xs sm:text-md mt-2 text-gray-600'>{userInfo?.profession} <span className='hidden sm:inline-block'>|</span> <br className='block sm:hidden' /> {userInfo?.company}</p>
                </div>
            </div>
        </div>
    )
}

export default Story
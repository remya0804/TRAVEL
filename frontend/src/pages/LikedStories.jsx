import React, { useContext, useEffect, useState } from 'react'
import { QuillContext } from '../context/QuillContext'
import Loading from '../components/Loading'
import StoryItem from '../components/StoryItem'
import { parseISO, formatDistanceToNow } from 'date-fns';


const LikedStories = () => {

    const [likedPosts,setLikedPosts] = useState([])
    const [loading,setLoading] = useState(true)

    const {location,storiesArray, userInfo,allAuthors} = useContext(QuillContext)

 
    useEffect(() => {

      if (!storiesArray || !userInfo) {
        setLoading(false); // No data to process, stop loading
        return;
      }

      // setLikedPosts([])

      const likedPostCopy = []

      setLikedPosts(likedPostCopy)

        if(storiesArray && userInfo){
    
          for(let i in storiesArray){

            for(let j in storiesArray[i].likes){

                if(storiesArray[i].likes[j].userId === userInfo._id){

                    // setLikedPosts((prev) => [...prev,storiesArray[i]])
                    likedPostCopy.push(storiesArray[i])

                    
                }
            }
          }
    
        }

    
        setLikedPosts(likedPostCopy)

        setLoading(false)        
   
      },[storiesArray,userInfo])

    
      if(loading){

        // setLoading(false)

        return <Loading />
      }
    
      if(likedPosts.length === 0 ){

        return <div>No stories liked yet!!</div>
      }
  

  return (

    <div className='w-full'>

{


likedPosts.map((story,idx) => {

    const authorInfo =  allAuthors.find(auth => auth._id === story.userId)

  return <StoryItem 
  
              key={story._id} 
              id={story._id}
              title={story.title}
              desc={story.desc}
              author={authorInfo? authorInfo.name : ""}
              thumbnail={story.photo}
              authorImage={authorInfo? authorInfo.photo : ""}
              category={story.category}
              createdDate = {formatDistanceToNow(parseISO(story.createdDate), { addSuffix: true }).replace("about ", "").replace("less than a", 1).replace("minutes","min").replace("hours","h").replace("hour","h").replace("minute","min").replace("months","mo").replace("month","mo").replace("year","y").replace("years","y")}
              disLikes={story.disLikes.length > 0 ? story.disLikes.length : 0}
              likes={story.likes.length > 0 ? story.likes.length : 0}

  />
})



}
        

    </div>
  )
}

export default LikedStories
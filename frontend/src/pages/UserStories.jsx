import React, { useContext, useEffect, useState } from 'react'
import { QuillContext } from '../context/QuillContext'
import Loading from '../components/Loading'
import StoryItem from '../components/StoryItem'
import { parseISO, formatDistanceToNow } from 'date-fns';


const UserStories = () => {

  const [userPosts,setUserPosts] = useState()
  const [loading,setLoading] = useState(true)

  const {storiesArray, userInfo,allAuthors} = useContext(QuillContext)

  useEffect(() => {

    if(storiesArray && userInfo){

      const posts = storiesArray.filter(post => post.userId === userInfo._id)

      setUserPosts(posts)

      setLoading(false)
    }


  },[storiesArray,userInfo])

  if(loading){

    return <Loading />
  }

  if(userPosts.length ==0 ){

    return <div>No stories posted yet!!</div>
  }

  return (

    <div className='w-full'>

      {

        userPosts.map((story,idx) => {

          const authorInfo =  allAuthors.find(auth => auth._id === story.userId)


          return <StoryItem 
          
                      key={idx} 
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

export default UserStories
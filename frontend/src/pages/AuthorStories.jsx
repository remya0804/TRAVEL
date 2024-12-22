import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'
import Loading from '../components/Loading'
import StoryItem from '../components/StoryItem'
import { parseISO, formatDistanceToNow } from 'date-fns';
import Authors from '../components/Authors'


const AuthorStories = () => {

    const {author} = useParams()    

    const {storiesArray,allAuthors,navigate} = useContext(QuillContext)

    const [stories,setStories] = useState([])
    const [authorInfo,setAuthorInfo] = useState(null)

    const [loading,setLoading] = useState(true)

    useEffect(() => {

      if(allAuthors && author){
    
        const authorData = allAuthors.find(auth => auth.name == author)

        setAuthorInfo(authorData)

        setLoading(false)

      }else{

        setLoading(true)
      }

    },[allAuthors,author])


    useEffect(() => {

        if(storiesArray && authorInfo){

          const storiesByAuthor = storiesArray.filter(story => story.userId == authorInfo._id)
  
            setStories(storiesByAuthor)  

            setLoading(false)
            
        }
        else{

          setLoading(true)
        }


    },[authorInfo,storiesArray])

    if(loading){

        return <Loading />
    }
    if(stories.length === 0){

        return <div className='text-center text-lg mt-10'> 

        <p>This author hasn't posted any stories yet!!</p>
        
        <button onClick={() => {navigate('/'),setSearchItem(""),setSearchBar(false)}} className='m-auto mt-7 px-8 py-2 rounded-full bg-green-600 text-white sm:text-sm text-xs'>Go Back</button></div>
    }

  return (
    <div>
    
        {

             stories.map((story,idx) => {

              return <StoryItem 
              
                            key={idx} 
                            id={story._id}
                            title={story.title}
                            desc={story.desc}
                            author={authorInfo.name}
                            authorImage={authorInfo.photo}
                            thumbnail={story.photo}
                            category={story.category}
                            createdDate = {formatDistanceToNow(parseISO(story.createdDate), { addSuffix: true }).replace("about ", "").replace("less than a", 1).replace("minutes","m").replace("hours","h").replace("hour","h").replace("minute","m").replace("months","mo").replace("month","mo").replace("year","y").replace("years","y").replace("days","d").replace("day","d").replace("ago","")}
                            disLikes={story.disLikes.length > 0 ? story.disLikes.length : 0}
                            likes={story.likes.length > 0 ? story.likes.length : 0}
                            
                            />
            })
        

      }

      <Authors />
      
    </div>
  )
}

export default AuthorStories
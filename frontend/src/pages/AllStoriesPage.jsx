import React, { useContext, useEffect, useState } from 'react'
import { QuillContext } from '../context/QuillContext'
import StoryItem from '../components/StoryItem'
import Authors from '../components/Authors'
import Loading from '../components/Loading'
import { parseISO, formatDistanceToNow } from 'date-fns';


const AllStoriesPage = () => {

    const {allAuthors,token,userInfo,storiesArray,filteredArray,setFilteredArray,searchItem,setSearchItem} = useContext(QuillContext)
    
      const [allStories,setAllstories] = useState([])

      const [loading,setLoading] = useState(true)
    
      useEffect(() => {

          if(storiesArray){

            if(searchItem?.trim()){
      
              const searchResults = storiesArray.filter(story => story.title.toLowerCase().includes(searchItem.toLowerCase()))      
        
              if(searchResults.length > 0){
        
                setAllstories(searchResults)
        
              }  else{
        
                setAllstories([])
              }
        
            } else{
        
              setAllstories(storiesArray)
            }

              setLoading(false)
            } else{

              setLoading(true)
            }

          
      },[searchItem,storiesArray])


if(loading){

  return <Loading />
}
 
  return (
    <div className='w-full'>

      <div>

        {

          allStories.map((story,idx) =>{

            const authorInfo = allAuthors.find(author => author._id === story.userId)

            return <StoryItem 
            
                            key={idx} 
                            id={story._id}
                            title={story.title}
                            desc={story.desc}
                            author={authorInfo? authorInfo.name : ""}
                            thumbnail={story.photo}
                            authorImage={authorInfo? authorInfo.photo : ""}
                            category={story.category}
                            createdDate = {formatDistanceToNow(parseISO(story.createdDate), { addSuffix: true }).replace("about ", "").replace("less than a", 1).replace("minutes","m").replace("hours","h").replace("hour","h").replace("minute","m").replace("months","mo").replace("month","mo").replace("year","y").replace("years","y").replace("days","d").replace("day","d").replace("ago","")}
                            disLikes={story.disLikes.length > 0 ? story.disLikes.length : 0}
                            likes={story.likes.length > 0 ? story.likes.length : 0}
                          
                          />
            
              
            
          })
        }

        { searchItem && allStories.length === 0 && <p>No stories found!!</p>}

      </div>   

      <Authors />

    </div>
  )
}

export default AllStoriesPage
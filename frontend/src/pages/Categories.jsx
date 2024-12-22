import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { QuillContext } from '../context/QuillContext'
import AllStories from '../components/AllStories'
import Loading from '../components/Loading'
import StoryItem from '../components/StoryItem'
import { parseISO, formatDistanceToNow } from 'date-fns';
import CategoryList from '../components/CategoryList'
import Authors from '../components/Authors'


const Categories = () => {

    const {category} = useParams()

    const {storiesArray,allAuthors} = useContext(QuillContext)

    const [stories,setStories] = useState([])

    const [loading,setLoading] = useState(true)

    useEffect(() => {


        if(storiesArray && category){

            const storiesByCategory = storiesArray.filter(story => story.category === category)

            setStories(storiesByCategory)
            setLoading(false)

        } else{

            setLoading(true)
        }


    },[category,storiesArray])

    
    if(loading){

        return <Loading />
    }

  return (

    <div className='w-full mb-11'>

        {

            stories.map((story,idx) => {

                const authorInfo = allAuthors.find(author => author._id === story.userId)

                return <StoryItem 
          
                        key={idx} 
                        id={story._id}
                        title={story.title}
                        desc={story.desc}
                        author={authorInfo?.name}
                        authorImage={authorInfo?.photo}
                        thumbnail={story.photo}
                        category={story.category}
                        createdDate = {formatDistanceToNow(parseISO(story.createdDate), { addSuffix: true }).replace("about ", "")}
                        ddisLikes={story.disLikes.length > 0 ? story.disLikes.length : 0}
                        likes={story.likes.length > 0 ? story.likes.length : 0}
                        
                        />
            })
        }

        <Authors />
        
    </div>
  )
}

export default Categories
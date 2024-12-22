import React, { useContext, useEffect, useState } from 'react'
import StoryItem from './StoryItem';
import Authors from './Authors';
import { QuillContext } from '../context/QuillContext';
import { Link } from 'react-router-dom';
import { parseISO, formatDistanceToNow } from 'date-fns';


import search from '../assets/search.png'
import Loading from './Loading';

const AllStories = () => {

  const {allAuthors,token,searchBar,setSearchBar,navigate,storiesArray,filteredArray,setFilteredArray,searchItem,setSearchItem} = useContext(QuillContext)

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

        setAllstories(storiesArray.sort((a,b) => new Date(b.createdDate) - new Date(a.createdDate)).slice(0,2))

      }

      setLoading(false)


    }

  },[searchItem,storiesArray])

  if(loading){

    return <Loading />
  }

  // if(allStories.length === 0 && !loading) {

  //   return <div> No stories posted yet!! </div>
  // }

  return (

    <div className='w-full '>

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

        { searchItem && allStories.length === 0 && 
        
          <div className='flex flex-col items-center font-semibold'>

              <img className='w-[150px] sm:w-[200px]' src={search} alt="" />
            
              <p>No stories found!!</p>

              <button onClick={() => {navigate('/'),setSearchItem(""),setSearchBar(false)}} className='m-auto mt-7 px-8 py-2 rounded-full bg-green-600 text-white sm:text-sm text-xs'>Go Back</button>
              
          </div>}

      </div>

      {

        allStories.length >0 && 

        <Link to='/all-stories'>

          <div className='w-full text-center '>

            <button className='m-auto px-4 py-2 sm:px-6 sm:py-4 rounded-full bg-gray-900 text-white text-sm'>View All Stories</button>

          </div>

        </Link>

      }

      {

        allStories.length >0 && 

        <Authors />

      }



    </div>
  )
}

export default AllStories
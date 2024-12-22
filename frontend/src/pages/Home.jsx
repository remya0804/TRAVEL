import React, { useContext, useEffect, useRef, useState } from 'react'
import { QuillContext } from '../context/QuillContext'
import Hero from '../components/Hero'
import AllStories from '../components/AllStories'
import Loading from '../components/Loading'


const Home = () => {

      const {token,storiesArray} = useContext(QuillContext)

  //     const [allStories,setAllStories] = useState([])

  //     const [loading,setLoading] = useState(true)

  // if(storiesArray.length === 0 && token) {

  //   return <div> No stories posted yet!! </div>
  // }


  return (


    <div>

     {

        token 
        
        ? <AllStories />

         : <Hero />

     }
     

    </div>

   
  )
}

export default Home
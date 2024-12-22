import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import About from './pages/About'
import Write from './pages/Write'
import Footer from './components/Footer'
import { QuillContext } from './context/QuillContext'
import Profile from './pages/Profile'
import SearchBar from './components/SearchBar'
import Story from './pages/Story'
import Categories from './pages/Categories'
import AuthorStories from './pages/AuthorStories'
import AllStoriesPage from './pages/AllStoriesPage'
import UserStories from './pages/UserStories'
import EditProfile from './pages/EditProfile'

import { ToastContainer, toast } from 'react-toastify';
import AllStories from './components/AllStories'
import EditStory from './pages/EditStory'
import LikedStories from './pages/LikedStories'

const App = () => {

  const {dropDown,setDropDown,searchBar,setSearchBar} = useContext(QuillContext)

  const menuref = useRef(null)
    
  const closeOpenMenus = (e)=>{

    if(dropDown && menuref.current?.contains(e.target)){

      setDropDown(false)

    }
  }
  
  useEffect(() => {

    document.addEventListener("mousedown", closeOpenMenus);
  
    return () => {

      document.removeEventListener("mousedown", closeOpenMenus);

    };

  }, [dropDown]);


  return (

    <div className='w-full flex flex-col min-h-screen '>

      <ToastContainer />


      <Navbar />

      {

        searchBar

        ? <SearchBar />

        : ""
      }

      <div ref={menuref} className={`flex-1 ${searchBar ? 'pt-[30px]' : 'sm:pt-[120px] pt-[100px]' } px-[6%]  sm:px-[4%]`}>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/write' element={<Write />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/user-stories' element={<UserStories />} />
          <Route path='/author-stories/:author' element={<AuthorStories />} />
          <Route path='/all-stories' element={<AllStoriesPage />} />
          <Route path='/all-ss' element={<AllStories />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/edit-story/:postId' element={<EditStory />} />
          <Route path='/stories/:storyId' element={<Story />} />
          <Route path='/:category' element={<Categories />} />
          <Route path='/liked-stories' element={<LikedStories />} />

        </Routes>

      </div>

      <Footer />

    </div>
  )
}

export default App
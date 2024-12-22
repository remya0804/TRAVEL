import React, { useContext, useEffect, useState } from 'react'

import quill from '../assets/quill.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
import { TfiWrite } from "react-icons/tfi";
import { CgProfile } from "react-icons/cg";
import { CgNotes } from "react-icons/cg";
import { QuillContext } from '../context/QuillContext';
import Loading from './Loading';
import { FaRegHeart } from "react-icons/fa";

const Navbar = () => {

    const {userInfo,activeMenu,setActiveMenu,navigate,dropDown,setDropDown,token,setToken,searchBar,setSearchBar,searchItem,setSearchItem} = useContext(QuillContext)

    const [loading,setLoading] = useState(true)

  
    useEffect(() => {

        if(searchItem){

            navigate('/')
        }


    },[searchItem])

    // useEffect(() => {

    //     if(userInfo){

    //         setLoading(false)
    //     } else{

    //         setLoading(true)
    //     }
    // },[userInfo])

// if(loading){

//    return <Loading />
// }

  return (

    <div className='w-full flex justify-between items-center px-[4%] py-[20px] border-b-[1px] border-gray-900 fixed'>

            <Link to='/'>

                <div onClick={() => window.scrollTo(0,0)} className='flex items-center  '>

                    <img className='w-16 ' src={quill} alt="" />

                    <p className='font-logo font-extrabold text-2xl  sm:text-4xl ml-[-7px]'>Quill</p>

                </div>

            </Link>
           

            {

                token 

                ? <div className='flex items-center justify-end sm:justify-between gap-5 sm:gap-8 w-[60%] sm:w-[70%]'>

                        <CiSearch onClick={() => setSearchBar(!searchBar) } className='text-2xl sm:hidden' />

                        <div className='hidden w-[60%] border border-gray-400 rounded-full p-2 px-4 sm:flex items-center gap-3'>

                            <CiSearch className='text-2xl' />

                            <input onChange={(e) => setSearchItem(e.target.value)} value={searchItem} type="text" className='outline-none w-full' placeholder='Search' />


                        </div>

                        <Link to='/write'>

                            <div onClick={() => window.scrollTo(0,0)} className='flex items-center gap-2 text-gray-700'>

                                <TfiWrite className='text-xl'/>

                                <p className='text-md hidden sm:block'>Write</p>

                            </div>

                        </Link>

                        {

                            userInfo?.photo

                            ? <img onClick={() => setDropDown(!dropDown)} className='cursor-pointer w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-full object-cover' src={userInfo.photo} alt="" />

                            : <div onClick={() => setDropDown(!dropDown)}  className='cursor-pointer w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] rounded-full bg-blue-900 text-white text-center relative'> 

                                <p className='absolute bg-transparent left-[30%] top-[10%] text-md sm:text-xl font-semibold'>{ userInfo ? userInfo.name.slice(0,1) : ""}</p>

                            </div>

                        }

                        
                        <ul className={`text-gray-600 p-4 absolute rounded-md shadow-md w-[200px] top-[80px] right-0 ${dropDown ? "block" : "hidden"}`}>

                           <NavLink to='/profile'> 

                            <div onClick={() => {setDropDown(false),window.scrollTo(0,0)}} className='mt-9 flex gap-3 items-center hover:text-gray-900'>

                                <CgProfile />

                                <li className=''>Profile</li>
                                
                            </div>             
                            
                            </NavLink>

                           <NavLink to='/write'> 

                            <div onClick={() => {setDropDown(false),window.scrollTo(0,0)}} className='mt-9 flex gap-3 items-center hover:text-gray-900'>

                                <TfiWrite />

                                <li>Write</li>

                            </div>             
                            
                            </NavLink>
                           <NavLink to='/user-stories'> 

                            <div onClick={() => setDropDown(false)} className='mt-9 flex gap-3 items-center hover:text-gray-900'>

                                <CgNotes />

                                <li>Stories</li>

                            </div>             
                            
                            </NavLink>
                           <NavLink to='/liked-stories'> 

                            <div onClick={() => setDropDown(false)} className='mt-9 flex gap-3 items-center hover:text-gray-900'>

                                <FaRegHeart />

                                <li>Liked Stories</li>

                            </div>             
                            
                            </NavLink>

                            <hr  className='w-[90%] h-[1px] bg-gray-400 mt-5'/>

                            <li onClick={() => {localStorage.removeItem('token'),setToken(""),navigate('/')}} className='mt-4 hover:text-gray-900 cursor-pointer'>Sign Out</li>
                        </ul>                   



                    </div>

                :   <div className='flex items-center gap-7'>  

                        <ul className='hidden sm:flex items-center gap-7'>
            
                            <Link to='/'>
                                <li onClick={() => {setActiveMenu('home'),window.scrollTo(0,0)}} className={`text-md cursor-pointer ${activeMenu === "home" ? "underline underline-offset-4" : ""}`}>Home</li>
                            </Link>
            
                            <Link to='/about'>
                                <li onClick={() =>( setActiveMenu('about'),window.scrollTo(0,0))} className={`text-md cursor-pointer ${activeMenu === "about" ? "underline underline-offset-4" : ""}`}>About Us</li>
                            </Link>
            
                            <Link to={token ? '/write' : '/login'}>
                                <li onClick={() => {setActiveMenu(token ? 'write' : 'login'),window.scrollTo(0,0)}} className={`text-md cursor-pointer ${activeMenu === "write" ? "underline underline-offset-4" : ""}`}>Write</li>
                            </Link> 
            
                            <Link to='/login'>
                                <li onClick={() => {setActiveMenu('login'),window.scrollTo(0,0)}} className={`text-md cursor-pointer ${activeMenu === "login" ? "underline underline-offset-4" : ""}`}>Login</li>
                            </Link>    
            
                        
                        </ul>
            
                        <Link to={token ? '/home' : '/login'}>
            
                            <button onClick={() => setActiveMenu(token ? "home" : 'login')} className='bg-blue-950 text-white px-4 py-2 sm:px-4 sm:py-3 rounded-full text-[12px] sm:text-xs'>Get Started</button>
                        
                        </Link>
                        
                    </div>

                

                
            } 
            

        
        

    </div>
  )
}

export default Navbar
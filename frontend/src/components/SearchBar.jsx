import React, { useContext, useEffect } from 'react'

import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { QuillContext } from '../context/QuillContext';


const SearchBar = () => {

    const {navigate,searchBar,setSearchBar,searchItem,setSearchItem} = useContext(QuillContext)
 
    useEffect(() => {

      if(searchBar ){

        navigate('/')
        window.scrollTo(0,0)
      }

    },[searchBar])
    
  return (

    <div className='pt-[120px] px-[4%] w-full flex items-center justify-center gap-3 sm:hidden'>
        
        <div className='w-full  text-sm border border-gray-400 rounded-full p-2 px-4 flex items-center gap-3'> 

            
            <CiSearch className='text-xl' />
            <input onChange={(e) =>setSearchItem(e.target.value)} value={searchItem} type="text" placeholder='Search' className='outline-none w-full' />

        </div>

        <AiOutlineClose onClick={() => setSearchBar(false)} className='text-xl'/>


    </div>
  )
}

export default SearchBar
import { createContext, useEffect, useState } from "react";
// import { storiesArray } from "../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const QuillContext = createContext()

const QuillContextProvider = (props) => {

    const [dropDown,setDropDown] = useState(false)
    const [token,setToken] = useState("")
    const [searchBar,setSearchBar] = useState(false)
    const [filteredArray,setFilteredArray] = useState([])
    const [searchItem,setSearchItem] = useState("")
    const [activeMenu,setActiveMenu] = useState("home")
    const [userInfo,setUserInfo] = useState(null)
    const [storiesArray,setStoriesArray] = useState([])
    const [allAuthors,setAllAuthors] = useState([])

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const location = useLocation()

    const navigate = useNavigate()

    const blogCategories = [
        "-- Choose Category --",
        "Technology",
        "Lifestyle",
        "Travel",
        "Food",
        "Education",
        "Health",
        "Finance",
        "Entertainment",
        "Sports",
        "Parenting",
        "Fitness",
        "Fashion",
        "Photography",
        "Business",
    ];

    // console.log(allAuthors,storiesArray);
    
    // ******************** set Token *************************

    useEffect(() => {

        if(!token && localStorage.getItem('token')){

            setToken(localStorage.getItem('token'))
        }
    },[])

    // ******************** get user info *************************

    const getUserInfo = async () => {

        try {

            const response = await axios.post(backend_url + '/api/user/get-user',{},{headers:{token}})            

            if(response.data.success){

                setUserInfo(response.data.userInfo)
            }
            
            
        } catch (error) {

            console.log(error);

            toast.error(error.message)
            
            
        }
    }

    useEffect(() => {

        if(token){

            getUserInfo()
        }

    },[token])


        // ******************** fetch all stories *************************

    const fetchAllPosts = async () => {

        try {

            const response = await axios.get(backend_url + '/api/post/fetch-posts')

            setStoriesArray(response.data.allPosts)
            
            
        } catch (error) {

            toast.error(error.message)
            
        }
    }

    useEffect(() => {

        if(token){

            fetchAllPosts()

        }

    },[token])

            // ******************** fetch all users *************************

    const fetchUsers = async () => {

        try {

            const response = await axios.get(backend_url + '/api/user/get-all-users')

            if(response.data.success){

                setAllAuthors(response.data.allUsers)

            }
            
        } catch (error) {

            toast.error(error.message)
        }
    }

    useEffect(() => {

        if(token){

            fetchUsers()
        }
    },[token])


    
    const values = {

        dropDown,setDropDown,
        token,setToken,
        searchBar,setSearchBar,
        storiesArray,setStoriesArray,
        filteredArray,setFilteredArray,
        searchItem,setSearchItem,
        navigate,
        activeMenu,setActiveMenu,
        backend_url,
        userInfo,setUserInfo,
        blogCategories,
        fetchAllPosts,
        allAuthors,
        location
      
    }

    return (

        <QuillContext.Provider value={values}> 

            {props.children}


        </QuillContext.Provider>
    )
}

export default QuillContextProvider
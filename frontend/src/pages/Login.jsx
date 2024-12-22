import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { QuillContext } from '../context/QuillContext'
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

const Login = () => {

  const [loginState,setLoginState] = useState("Login")

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)

  const {backend_url,token,setToken,navigate} = useContext(QuillContext)


  const onSubmitHandler = async (e) => {

    e.preventDefault()

    try {

      if(loginState === "Sign Up"){

        const response = await axios.post(backend_url+'/api/user/create-account',{name,email,password})
        
        if(response.data.success){

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)

          toast.success(response.data.message)

          navigate('/')


        } else {

          toast.error(response.data.message)
        }

      } else {

        const response = await axios.post(backend_url+'/api/user/login',{email,password})

        if(response.data.success){

          setToken(response.data.token)

          localStorage.setItem('token',response.data.token)

          toast.success(response.data.message)

          navigate('/')


        } else {

          toast.error(response.data.message)
        }
        
      }
      
    } catch (error) {

      console.log(error);

      toast.error(error.message)
      
      
    }

    
  }

  
  return (

    <div className='w-full mt-[-10px] h-auto lg:h-[400px] flex flex-col sm:flex-row gap-10 justify-start items-center sm:bg-blue-950  sm:shadow-xl p-6 lg:p-8 mb-8'>

      <div className=' bg-transparent  flex-1  flex-col items-center w-full hidden sm:flex'>

        <p className='bg-transparent text-white sm:text-4xl lg:text-6xl '>Welcome!</p>

        {

          loginState === "Login"

          ? <p className='bg-transparent text-white my-5'>Don't have an account?</p>


          : <p className='bg-transparent text-white my-5'>Already have an account?</p>
        }


        <button onClick={() => setLoginState(prev => prev==="Sign Up" ? "Login" : "Sign Up")} className='m-auto px-8 py-2 rounded-full bg-slate-100 text-gray-800 sm:text-sm text-xs'> {loginState === 'Sign Up' ? 'Login' : "Sign Up"}</button>

      </div>

      <form onSubmit={(e) => onSubmitHandler(e)} className='sm:flex-1 h-[280px] lg:h-[320px] sm:px-4 pb-5 pt-5 flex flex-col items-center w-full'>

        <p className='text-xl lg:text-3xl font-semibold mb-5'>{loginState === 'Sign Up' ? 'Sign Up' : "Login"}</p>
        
        <div className='w-[80%]'>

          {loginState === 'Sign Up' 
          
            ? <input className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-2 lg:p-3 text-xs sm:text-sm' onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Name' />
            
            :""}

            <input className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-2 lg:p-3 text-xs sm:text-sm'  onChange={(e) => setEmail(e.target.value)} value={email}   type="email" placeholder='Email' />


          <div className='relative w-full'>

            <input className='mb-3 w-full rounded-md  outline-none bg-transparent focus:ring-gray-500 focus:ring-[0.5px] border border-gray-400 p-2 lg:p-3 text-xs sm:text-sm'  onChange={(e) => setPassword(e.target.value)} value={password}   type={`${showPassword ? "text" : "password" }`} placeholder='Password' />        

            {

              showPassword 
              
              ? <IoMdEye onClick={() => {setShowPassword(false)}} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500' />

              : <IoMdEyeOff onClick={() => {setShowPassword(true)
              }} className= 'absolute top-3 right-4 cursor-pointer z-10 text-gray-500'/>
            }

          </div>

          
        </div>

        {

          loginState === 'Sign Up' 
          
          ? <button  className='m-auto mt-3 mb-5 px-8 py-2 rounded-full bg-blue-900 text-white sm:text-sm text-xs'>Sign Up</button>

          : <button  className='m-auto mt-3 mb-5 px-8 py-2 rounded-full bg-blue-900 text-white sm:text-sm text-xs'>Login</button>

        }

        

        {

          loginState === "Login"

          ? <p className='sm:hidden text-sm'>Don't have an account? <span onClick={() => setLoginState("Sign Up")} className='text-blue-600 underline '> Sign Up</span></p>

          : <p className='sm:hidden text-sm'>Already have an account? <span onClick={() => setLoginState("Login")} className='text-blue-600 underline '> Login</span></p>

        }

      </form>

     

     
      

    </div>
  )
}

export default Login
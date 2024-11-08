import React, { useState } from 'react'
import { BiHome } from 'react-icons/bi'
import { FaUserAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../services/allAPI'
import { toast } from 'react-toastify'

function Login() {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    // console.log(userDetails);
    const { email, password } = userDetails
    if (!email || !password) {
      toast.info('Please fill all the fields')
    }
    else {
      try {
        const result = await loginAPI(userDetails)
        console.log(result.data);
        if (result.status == 200) {
          toast.success('Login Successful')
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
          sessionStorage.setItem("token", result.data.token)
          setUserDetails({
            email: "",
            password: ""
          })
          navigate('/')
        }
        else if (result.status == 400) {
          toast.error(result.response.data)
        }
        else {
          toast.error('Something went wrong')
        }

      } catch (error) {
        console.log(error);
        toast.error('Something went wrong')
      }
    }

  }
  return (
    <>
      <div className='w-10/12 md:w-4/12 mx-auto bg-gradient-to-br from-green-600 to-green-950 px-9 py-5 mt-20 rounded-2xl'>
        <Link to={'/'}> <BiHome className='text-2xl cursor-pointer text-white' /></Link>
        <div className='justify-center flex'><FaUserAlt className='text-9xl text-white' /></div>
        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" className="grow" placeholder="Email" onChange={(e) => { setUserDetails({ ...userDetails, email: e.target.value }) }} />
        </label>

        <label className="input input-bordered flex items-center gap-2 my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow" placeholder="Password" onChange={(e) => { setUserDetails({ ...userDetails, password: e.target.value }) }} />
        </label>
        <button className='btn w-full' onClick={handleLogin}>Login</button>
        <p className='text-center mt-3 text-white'>Don’t have an Account? <Link to={'/register'}><span className='hover:underline'>Register</span></Link></p>
      </div>
    </>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import { LuAlignJustify } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom'
import chef from '../assets/chef-svgrepo-com.svg'
import { baseUrl } from '../services/baseURL'

function Header() {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState("")
    const [prof, setProf] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setIsLogin(true)
        }
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const userData = JSON.parse(sessionStorage.getItem("existingUser"))
            setUser(userData)
            setProf(userData.profilepic)
        }
    }, [])

    const handleLogout = () =>{
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate('/')
    }

    return (
        <div className='navbar px-4 fixed bg-white z-10'>
            <div className="flex-1">
                <Link to={'/'}>
                    <div className='flex justify-center items-center'>
                        <img src={chef} alt="Chef Logo" className='w-12 h-10' />
                        <span className="text-2xl ms-0.5 montserrat-subrayada-bold bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-transparent bg-clip-text">RecipeNest</span>
                    </div>
                </Link>
            </div>


            {/* <div className="hidden md:flex space-x-4 me-6">
                <Link to={'/recipes'}><span className='btn btn-ghost text-base'>Recipes</span></Link>
            </div> */}


            {/* <div className="md:hidden flex items-center">
                <div className="dropdown dropdown-end">
                    <button><LuAlignJustify className="text-2xl" /></button>
                    <ul tabIndex={0} className='menu menu-sm dropdown-content mt-3 bg-base-100 rounded w-52 shadow'>
                        <li><Link to={'/recipes'}><span className='btn btn-ghost text-base w-full'>Recipes</span></Link></li>
                    </ul>
                </div>
            </div> */}



            {isLogin ? <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Profile" src={prof ? `${baseUrl}/uploads/${prof}` : "https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640"} />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><Link to={`/profile/${user._id}`}><a className="justify-between">Profile</a></Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
                :
                <div className="hidden md:flex space-x-1">
                    <Link to={'/login'}><button className='btn bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-white'>Login</button></Link>
                    <Link to={'/register'}><button className='btn bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-transparent bg-clip-text border shadow-slate-900'>Sign Up</button></Link>
                </div>}

        </div>
    )
}

export default Header

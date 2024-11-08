import React, { useEffect, useState } from 'react'
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import Card from './Card'
import { Link, useParams } from 'react-router-dom'
import { FaInstagram } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { BsYoutube } from 'react-icons/bs'
import Header from './Header'
import Footer from './Footer'
import { getAUserAPI, getAUserRecipeAPI } from '../services/allAPI'
import { baseUrl } from '../services/baseURL'

function PublicProfile() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        about: "",
        instagram: "",
        youtube: "",
        profilepic: "",
    })
    const [userRecipes, setUserRecipes] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getUser()
        getUserRecipe()
    }, [])

    const getUser = async () => {
        const result = await getAUserAPI(id)
        setUserDetails(result.data);
    }

    const getUserRecipe = async () => {
        const result = await getAUserRecipeAPI(id)
        setUserRecipes(result.data);
    }

    return (
        <>
            <Header />
            <div className="h-20"></div>
            <div className='w-11/12 md:w-7/12 mx-auto rounded-md mt-5 pt-2 pb-16 mb-20 shadow-slate-950 shadow'>
                <div className='flex justify-center mt-5'>
                    <img src={userDetails.profilepic ? `${baseUrl}/uploads/${userDetails.profilepic}` : "https://i0.wp.com/passivesills.com/wp-content/uploads/2020/06/User-Icon-Grey.png?fit=400%2C400&ssl=1&w=640"} alt="Profile" className='h-32 w-32 md:h-44 md:w-44 object-cover rounded-full' />
                </div>
                <div className='flex flex-col items-center'>
                    <h1 className='font-semibold text-2xl'>{userDetails.username}</h1>
                    <div className='mt-1 flex text-2xl gap-2 cursor-pointer'>
                        <Link to={`${userDetails.youtube}`}><BsYoutube className='text-emerald-700' /></Link>
                        <Link to={`mailto:${userDetails.email}`}><MdEmail className='text-emerald-700' /></Link>
                        <Link to={`${userDetails.instagram}`}><FaInstagram className='text-emerald-700' /></Link>
                    </div>
                    <div>
                        <p className='text-center mt-5 text-xl font-semibold'>About Me</p>
                        <p className='px-10 mt-5 text-justify'>{userDetails.about}</p>
                    </div>


                    <div>
                        <p className='text-center mt-5 text-xl font-semibold mb-3'>My Recipes</p>

                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-16'>
                                {userRecipes.length > 0 ?
                                    userRecipes.map((item, index) => (
                                        <Card key={index} recipess={item}/>
                                    ))
                                    :
                                    <p>No Recipes added</p>

                                }
                            </div>
                            {/* <div className='flex justify-center'>
                                <button className='btn rounded-full'><BiCaretLeft className='text-xl' /></button>
                                <button className='btn rounded-full ms-2'><BiCaretRight className='text-xl' /></button>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default PublicProfile
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import biryani from '../assets/biryani.jpg'
import { BsClockFill } from 'react-icons/bs'
import { FaFire, FaUserAlt } from 'react-icons/fa'
import { BiDish } from 'react-icons/bi'
import { Link, useParams } from 'react-router-dom'
import { getRecipeAPI } from '../services/allAPI'
import { baseUrl } from '../services/baseURL'

function ViewRecipe() {
  const [recipeDet, setRecipeDet] = useState({})
  const [pic,setPic]=useState("")
  const [userId,setUserId]=useState("")
  
  const { id } = useParams()

  useEffect(() => {
    getRecipe(id)

  }, [])

  const getRecipe = async (recipeId) => {
    try {
      const result = await getRecipeAPI(recipeId)
      console.log(result.data);
      if (result.status == 200) {
        setRecipeDet(result.data)
        setPic(result.data.thumbnail)
        setUserId(result.data.userId._id)
      }
      else {
        console.log(result);
      }
    } catch (error) {
      console.log(`${error}`);
      
    }
  }

  useEffect(() => {
    console.log(recipeDet);
  }, [recipeDet])
  return (
    <>
      <Header />
      <div className="h-20"></div>
      <div className='w-11/12 md:w-7/12 mx-auto rounded-md pt-2 pb-16 mb-20 shadow-slate-950 shadow'>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4">
          <div className='flex items-center mt-2'>
            <img src={pic ? `${baseUrl}/uploads/${pic}` : ''} alt="recipe image" className='h-96 w-full' />
          </div>
          <div className='flex flex-col justify-center'>
            <div className='py-2'>
              <h1 className='text-2xl font-bold text-justify me-8'>{recipeDet?.title}</h1>
              <div className="flex items-center flex-shrink-0 mt-6">
                <span className='font-medium'>created by</span>
                <Link to={`/profile-public/${userId}`}><span className='font-medium ms-1 underline cursor-pointer'>{recipeDet?.userId?.username}</span></Link>
              </div>
            </div>
            <p className='mt-2'><span className='text-justify'>{recipeDet?.description}</span> </p>


            <div className='justify-start mt-5'>
              <span className='flex items-center'><BsClockFill className='mt-2' /><span className='text-sm font-bold ms-2 mt-2' >{recipeDet?.time}</span></span>
              <span className='flex items-center '><FaUserAlt className='mt-2 text-xl' /><span className='text-sm font-bold ms-2 mt-2' > {recipeDet?.serves}</span></span>
              <span className='flex items-center'><BiDish className='mt-2' /><span className='text-sm font-bold ms-2 mt-2' >{recipeDet?.cuisine}</span></span>
              <span className='flex items-center '><FaFire className='mt-2 text-xl' /><span className='text-sm font-bold ms-2 mt-2' >{recipeDet?.calories}</span></span>

            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 mt-8 px-4' >
          <p className='text-2xl font-bold'>Ingredients</p>
          <div className='mt-3 ms-5'>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">

             {recipeDet?.ingredients?.split(";\r\n").map((item,index)=>(<li key={index}>{item}</li>)) }
            </ul>
          </div>
        </div>
        <div className='grid grid-cols-1 mt-6 mb-10 px-4' >
          <p className='text-2xl font-bold'>How to Make {recipeDet?.title}</p>
          <div className='mt-3 ms-5'>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
             {recipeDet?.instructions?.split("\r\n").map((item,index)=>(<li key={index}>{item}</li>)) }
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default ViewRecipe
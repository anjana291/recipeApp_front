import React from 'react'
import food from '../assets/foodd.png'
import pizza from '../assets/pizza.jpg'
import { Link } from 'react-router-dom'


function Main() {
  return (
    <div style={{ minHeight: '80vh'}} className='pt-12'>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className='flex flex-col justify-center items-center px-10'>
          <h1 className='text-5xl'>
          <span className="montserrat-subrayada-bold">Recipe</span>
          <span className="montserrat-subrayada-bold">Nest</span>
          </h1>
          <p className='text-2xl italic text-green-700 mt-3'>From Your Kitchen to the World</p>
          <Link to={'/recipes'}><button className='btn mt-5 btn-outline'>Recipes</button></Link>
        </div>
        <div>
          <img src={`${food}`} alt="" />
        </div>
      </div>
      <div className='w-full h-14 bg-gradient-to-br from-green-400 via-green-700 to-green-950'></div>

    </div>
  )
}

export default Main
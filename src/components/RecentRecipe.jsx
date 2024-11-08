import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import { BiChevronRightCircle } from 'react-icons/bi'

function RecentRecipe() {
    return (
        <>
            <div className='mb-24 mt-16'>
                <h2 className='text-center text-3xl font-bold mb-14'>Recent Recipes</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-items-center px-32 gap-6'>
                    <Card />
                    <Card />
                    <Card />
                </div>
                <Link to={'/recipes'}>
                    <div className='flex justify-center mt-5 cursor-pointer hover:underline'>
                        <span className='ms-1 font-semibold'>Explore more Recipes</span>
                        <span className='text-2xl'> <BiChevronRightCircle /></span>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RecentRecipe
import React from 'react'
import foodd from '../assets/foood.png'
import { BsClockFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { baseUrl } from '../services/baseURL'

function Card({ recipess }) {
   

    return (
        <div className='flex flex-col items-center border shadow shadow-emerald-900 rounded-xl w-72 cursor-pointer my-12 transition ease-in-out delay-150 hover:-translate-y-3' style={{ height: '300px' }}>
            <img src={recipess?`${baseUrl}/uploads/${recipess.thumbnail}`:`${foodd}`} alt="" className='w-56 h-56 rounded-full -mt-24' />
            <div className='tooltip tooltip-bottom' data-tip={`${recipess?.title}`}>
                <h1 className='text-xl ms-2 font-semibold'>{recipess?.title?.slice(0,25)}</h1>
            </div>
            <div className='ms-2'>
                <span className='flex items-center'><FaUserAlt className='mt-2' /> <span className='text-sm font-bold ms-2 mt-2'>serves {recipess?.serves}</span></span>
                <span className='flex items-center'><BsClockFill className='mt-2' /><span className='text-sm font-bold ms-2 mt-2' > {recipess?.time}</span></span>
            </div>
            <div className='flex'>
                {recipess?._id ? (
                    <Link to={`/view-recipe/${recipess._id}`}>
                        <button className='btn btn-outline mt-5 mb-5'>View Recipe</button>
                    </Link>
                ) : (
                    <button className='btn btn-outline mt-5 mb-5' disabled>No Recipe Found</button>
                )}
            </div>
        </div>
    )
}

export default Card
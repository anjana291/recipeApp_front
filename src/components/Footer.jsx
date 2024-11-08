import React from 'react'
import chef from '../assets/chef-svgrepo-com.svg'
import { BsTwitterX, BsYoutube } from 'react-icons/bs'
import { FaFacebook } from 'react-icons/fa'

function Footer() {
  return (
    <>
      <footer className="footer footer-center bg-gradient-to-br from-green-400 via-green-700 to-green-950 text-primary-content p-10">
        <aside>
          <img src={chef} alt="" className='w-24' />
          <p className="font-bold ">
           <span className='montserrat-subrayada-bold '> RECIPENEST</span>
            <br />
            From Your Kitchen to the World
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <span className='text-2xl cursor-pointer'> <BsTwitterX /></span>
            <span className='text-2xl cursor-pointer'> <BsYoutube /></span>
            <span className='text-2xl cursor-pointer'> <FaFacebook /></span>
          </div>
        </nav>
      </footer>
    </>
  )
}

export default Footer
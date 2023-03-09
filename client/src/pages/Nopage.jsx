import React from 'react'
import { Link } from 'react-router-dom'
import {TiWarning} from 'react-icons/ti'
const Nopage = () => {
  return (
    <div className='flex justify-center items-center mt-10 flex-col'>
         <TiWarning className='text-8xl text-pink-500 py-0'/>
         <span className='font-bold text-4xl pb-2 text-gray-600'>404</span>
        <h2 className='font-semibold text-2xl text-gray-600 py-2'>Sorry, this page not found</h2>
        <Link to="/" className='bg-pink-500 px-2  rounded-lg py-1 my-3 font-semibold text-white'>Go Back</Link>
    </div>
  )
}

export default Nopage
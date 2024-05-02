import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Loader = () => {
  return (
    <div className="relative flex justify-center items-center h-screen">
    <div className="animate-spin h-24 w-24 border-t-4 border-b-4 border-purple-500 rounded-full">


    </div>
    <div className='absolute flex justify-center items-center'>
    <FontAwesomeIcon icon={faTimes} className="text-3xl text-purple-500 animate-ping " />
    </div>
   
  </div>
  )
}

export default Loader
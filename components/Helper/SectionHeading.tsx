import React from 'react'


type props ={
    heading:string;
}

const SectionHeading = ({heading}:props) => {
  return (
    <div className='w-[80%] mx-auto'>
        <h1 className='text-xl sm:text-3xl text-red-950 font-extrabold'>{heading}</h1>
        <p className='mt-2 text-gray-700 sm:text-base text-sm font-bold'>Christ Is The Answer Ministries Kisumu</p>
    </div>
  )
}

export default SectionHeading
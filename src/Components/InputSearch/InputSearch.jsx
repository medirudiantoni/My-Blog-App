import React from 'react'
import searchPng from '../../assets/search.png'
import searcGrayhPng from '../../assets/searchGray.png'

const InputSearch = () => {
  return (
    <div className="w-full relative rounded-md overflow-hidden">
      <input type="search" placeholder='search for article' className='w-full h-full py-2 px-4 pr-10 text-sm border border-gray-300 rounded-md ring-0 outline-none' />
      <div className="absolute top-0 right-0 w-11 h-full flex items-center justify-center">
        <img src={searcGrayhPng} alt="search" className='w-6 h-6 object-cover' />
      </div>
    </div>
  )
}

export default InputSearch
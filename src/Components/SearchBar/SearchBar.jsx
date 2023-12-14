import React, { useEffect, useState } from "react";
import searchWhite from '../../assets/searchWhite.png'

const SearchBar = ({placeholder, outlet}) => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(()=>{
    const vwResizer = () => {
      if(window.innerWidth <= 767){
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', vwResizer)
  }, [])
  return (
    <div className={`w-full flex bg-white gap-1 max-w-xl h-fit rounded-md md:relative overflow-hidden ${ isMobile ? isActive ? outlet ? '-translate-y-[10vh] fixed w-[100vw] top-0 left-0 p-5' : 'fixed w-[100vw] top-0 left-0 p-5' : '' : ''}`}>
      <input
        type="text"
        maxLength={30}
        placeholder={placeholder}
        className={`justify-center md:w-full md:pl-4 md:pr-20 md:py-2 text-sm font-medium text-gray-700 bg-white md:border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-md md:inline-block origin-left ${ isMobile ? isActive ? 'w-full pl-4 pr-20 py-2 duration-200 delay-200 relative' : 'w-0 p-0 absolute' : ''}`}
      />
      <button
        className="py-2 px-4 md:absolute inline-block h-full top-0 right-0 bg-blue-600 text-white text-sm rounded-md md:rounded-none"
        onClick={() =>  isMobile ? isActive ? setIsActive(false) : setIsActive(true) : ''}
      >
        <img
          src={searchWhite}
          alt=""
          className="w-7 h-5 object-contain rotate-90"
        />
      </button>
    </div>
  );
};

SearchBar.defaultProps = {
    placeholder: 'Search'
}

export default SearchBar;

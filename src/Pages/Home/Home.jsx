import React, { useState } from 'react'
import Header2 from '../../Components/Header/Header2'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Main from './Main'

const Home = () => {
  const [isSidebar, setIsSidebar] = useState(false);
  const handleSidebar = () => {
    setIsSidebar(!isSidebar);
  };
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="w-full h-full grid grid-cols-12 relative">
        <div className={`w-5/6 sm:w-1/3 bg-white md:w-full fixed right-full md:translate-x-0 z-[100] top-0 duration-200 ${isSidebar ? 'translate-x-full' : 'translate-x-0'} md:left-0 md:relative md:col-span-3 xl:col-span-2 h-full border-r-2`}>
          <Sidebar onToggle={handleSidebar} />
        </div>
        <div className="col-span-12 md:col-span-9 xl:col-span-10 h-full relative">
          <Header2 onToggle={handleSidebar} />
          <Main />
        </div>
      </div>
    </div>
  )
}

export default Home;
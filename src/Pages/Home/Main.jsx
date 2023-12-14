import React from 'react'
import { Outlet } from 'react-router'

const Main = () => {
  return (
    <div className="w-full h-full relative pt-[10vh]">
        <div className="w-full h-full">
            <Outlet />
        </div>
    </div>
  )
}

export default Main
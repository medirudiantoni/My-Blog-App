import React, { useState } from "react";

const Toggle = ({onClick, menuState}) => {
  const [isMenu, setIsMenu] = useState(menuState)
  return (
    <div
      className="absolute top-1/2 left-full lg:hidden w-8 h-16  flex items-center justify-center cursor-pointer hover:scale-105 duration-75"
      onClick={onClick}
    >
      <div
        className={`w-2 h-4/6 relative ${isMenu ? "rotate-180" : "rotate-0"}`}
      >
        <div className="w-1.5 rounded h-1/2 bg-slate-600 rotate-[30deg] translate-y-0.5"></div>
        <div className="w-1.5 rounded h-1/2 bg-slate-600 rotate-[-30deg] -translate-y-1"></div>
      </div>
    </div>
  );
};

export default Toggle;

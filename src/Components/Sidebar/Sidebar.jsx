import React from "react";
import { Link } from "react-router-dom";
import circleXPng from '../../assets/circle-xmark.png';
import homePNG from '../../assets/home.png';
import blogPNG from '../../assets/blog-text.png';
import assetsPNG from '../../assets/picture.png';
import usersPNG from '../../assets/users.png';
import settingsPNG from '../../assets/settings.png';
import homePNGWhite from '../../assets/homeWhite.png';
import blogPNGWhite from '../../assets/blog-textWhite.png';
import assetsPNGWhite from '../../assets/pictureWhite.png';
import usersPNGWhite from '../../assets/usersWhite.png';
import settingsPNGWhite from '../../assets/settingsWhite.png';
import plusPNGWhite from '../../assets/plusWhite.png'

const Sidebar = ({onToggle}) => {
  const pages = [
    { name: 'Home', path: '', icon: homePNG, icon2: homePNGWhite },
    { name: 'Blog', path: '/blog', icon: blogPNG, icon2: blogPNGWhite },
    { name: 'Assets', path: '/assets', icon: assetsPNG, icon2: assetsPNGWhite },
    { name: 'Contributor', path: '/contributor', icon: usersPNG, icon2: usersPNGWhite },
    { name: 'Settings', path: '/settings', icon: settingsPNG, icon2: settingsPNGWhite }
  ]
  return (
    <div className="w-full h-fit">
      <div className="w-full h-[10vh] flex items-center justify-between px-5 md:px-10 border-b-2">
        <Link to={pages[0].path}>
            <p className="text-2xl font-semibold">Go Blog</p>
        </Link>
        <div onClick={onToggle} className="w-6 h-6 cursor-pointer md:hidden">
            <img src={circleXPng} alt="x" className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="py-5 flex flex-col sm:gap-3p">
        <div className="px-3 md:px-6 mb-2">
          <Link to='/new'>
            <div className="py-2 px-4 w-fit rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-900 active:scale-95 duration-200 text-white flex gap-3 items-center">
              <img src={plusPNGWhite} alt="p" className="w-4 h-4 object-cover" />
              <p>New Post</p>
            </div>
          </Link>
        </div>
        {pages.map((page, i) => {
            return (
                <Link to={page.path} key={i}>
                    <div onClick={onToggle} className="w-full py-2 px-5 md:px-10 flex items-center gap-4 group hover:bg-blue-600 hover:text-white">
                      <img src={page.icon} alt="/" className="w-4 h-4 object-cover group-hover:hidden" />
                      <img src={page.icon2} alt="/" className="w-4 h-4 object-cover hidden group-hover:inline-block" />
                      <p>{page.name}</p>
                    </div>
                </Link>
            )
        })}
      </div>
    </div>
  );
};

export default Sidebar;

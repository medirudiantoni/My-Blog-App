import React, { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { easeIn, motion, AnimatePresence, easeInOut } from "framer-motion";
import bellPng from "../../assets/bell.png";
import sidebarPng from "../../assets/sidebar.png";
import AccountInfo from "./AccountInfo";
import userPNG from "../../assets/user.png";
import { RootContext } from "../../context/Auth/RootContext";
import Notification from "./Notification";

const Header2 = ({ onToggle }) => {
  const [isAccount, setIsAccount] = useState(false);
  const [isNotification, setIsNotification] = useState(false)
  const [isThereNotification, setIsThereNotification] = useState(false)
  const [isUser, setIsUser] = useState()
  const [isPhoto, setIsPhoto] = useState()
  const {userInfo} = useContext(RootContext)
  const setAva = async () => {
    if(userInfo){
      const docRef = doc(db, "users", userInfo.email)
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()){
        setIsUser(docSnap.data())
        setIsPhoto(docSnap.data().imageUrl)
      } else {
        console.log('No such document!!!')
      }
    }
  }
  useEffect(() => {
    setAva()
  }, [])
  
  
  return (
    <header className="w-full h-[10vh] flex items-center justify-between md:justify-end px-5 md:px-10 absolute z-[99] top-0 left-0 md:border-b-2">
      <div className="w-6 h-6 md:hidden cursor-pointer" onClick={onToggle}>
        <img
          src={sidebarPng}
          alt="sidebar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-fit h-full flex gap-5 items-center relative z-10">
        <div onClick={() => {
          setIsNotification(!isNotification)
          setIsAccount(false)
        }} className="w-6 h-6 relative">
          {isThereNotification && <div className="absolute -top-1 -right-0.5 w-3 h-3 rounded-full bg-blue-600"></div>}
          <img
            src={bellPng}
            alt="bell"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          onClick={() => {
            setIsAccount(!isAccount);
            setIsNotification(false)
          }}
          className="w-10 h-10 rounded-3xl bg-slate-300 overflow-hidden cursor-pointer flex items-center justify-center"
        >
          {isPhoto ? <img src={isPhoto} className="w-full h-full object-cover" /> : <img src={userPNG} className="w-2/3 h-2/3 object-cover" />}
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isAccount && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-10 top-full right-5 md:right-10"
          >
            <AccountInfo onClick={() => setIsAccount(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      <Notification isNotification={isNotification} />
    </header>
  );
};

export default Header2;

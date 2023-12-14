import React, { useContext, useState, useEffect } from 'react'
import { ButtonBlue } from '../../Components/Buttons/Button1'
import { Link } from 'react-router-dom'
import { db } from '../../Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { RootContext } from '../../context/Auth/RootContext'
import portraitPNG from '../../assets/portrait.png'

const UserProfile = () => {
  const {userInfo} = useContext(RootContext)
  const [user, setUser] = useState();

  const imageUser = user ? user.imageUrl : null
  const username = user ? user.username : null
  const email = user ? user.email : null
  const phone = user ? user.phone : null
  const role = user ? user.role : null
  
  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, "users", userInfo.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    getUserInfo();
  }, [userInfo.email]);

  return (
    <div className="w-full h-[90vh] overflow-y-scroll lg:h-full p-5 bg-slate-100">
        <div className="text-3xl font-semibold mb-5">User Profile</div>
        <div className="w-full p-8 bg-white">
          <div className="flex flex-wrap relative">
            <div className="w-full max-w-xs flex flex-col gap-4">
              <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center bg-slate-200">
                { imageUser ?  <img src={imageUser} alt="profile" className='w-full h-full object-cover' /> : <img src={portraitPNG} className='w-5 h-5 object-cover' />}
              </div>
              <div className="mb-4">
                <p className="font-semibold text-xl">{username}</p>
                <p className="text-sm text-slate-700">{role}</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 md:px-8 md:border-l-2">
              <div className="">
                <p className="text-sm text-slate-700">username</p>
                <p className="font-semibold">{username}</p>
              </div>
              <div className="">
                <p className="text-sm text-slate-700">Email</p>
                <p className="font-semibold">{email}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-700">Phone</p>
                <p className="font-semibold">{phone ? phone : '-'}</p>
              </div>
            </div>
          </div>
          <div className="w-full flex md:justify-end">
            <Link to={'/edit-profile'}><ButtonBlue name={'Edit Profile'} /></Link>
          </div>
        </div>
    </div>
  )
}

export default UserProfile


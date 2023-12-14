import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ButtonRed } from "../Buttons/Button1";
import { auth, db } from "../../Firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { RootContext } from "../../context/Auth/RootContext";

const AccountInfo = ({onClick}) => {
  const {userInfo} = useContext(RootContext)
  const [userName, setUserName] = useState()
  const [userPhoto, setUserPhoto] = useState();

  const getUserInfo = async () => {
    const docRef = doc(db, "users", userInfo.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().username);
      setUserPhoto(docSnap.data().imageUrl);
    } else {
      console.log("No such document!");
    }
  };
  getUserInfo();

  return (
    <div className="w-fit max-w-lg h-fit p-5 lg:px-10 rounded-xl bg-white/20 backdrop-blur-lg shadow-xl">
      <div className="w-full flex flex-col gap-4 pb-2 border-b-2 border-black items-center">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-green-600 text-white text-2xl font-semibold flex items-center justify-center">
          {userPhoto ? <img src={userPhoto} className="w-full h-full object-cover" /> : 'M'}
        </div>
        <Link to='/profile'><p onClick={onClick} className="font-semibold hover:text-blue-600 active:text-blue-900">{userName}</p></Link>
      </div>
      <div className="w-full pt-5 pb-2 flex-col items-center gap-2">
        <ButtonRed
          name={"Sign out"}
          wFull={true}
          onClick={() => signOut(auth)}
        />
      </div>
    </div>
  );
};

export default AccountInfo;

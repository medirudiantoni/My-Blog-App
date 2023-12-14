import React, { createContext, useReducer, useState } from 'react'
// import { handleJumlah } from './RootReducer';

// const INITIAL_STATE = {
//   currentUser: false,
//   currentUserData: null,
// }

// export const RootContext = createContext(INITIAL_STATE);
export const RootContext = createContext();
const Provider = RootContext.Provider;

const GlobalProvider = (Children) => {
  return () => {
    const [currentUser, setCurrentUser]= useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userData, setUserData] = useState(null);
    const [previewPostKey, setPreviewPostKey] = useState()
    
    const handleUser = (action) => {
      if(action.type === "LOGIN"){
        setCurrentUser(true);
        setUserInfo(action.payload)
      }
      if(action.type === "LOGOUT"){
        setCurrentUser(false);
        setUserInfo(null)
        setUserData({})
      }
    }

    const handleUserData = (data) => {
      setUserData(data)
    }

    const handleSavePreviewPostKey = (data) => {
      setPreviewPostKey(data)
    }
    return (
      <Provider value={{currentUser, userInfo, handleUser, handleUserData, previewPostKey, handleSavePreviewPostKey}}>
        <Children />
      </Provider>
    )
  }
}

export default GlobalProvider
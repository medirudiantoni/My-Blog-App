import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { RootContext } from '../../context/Auth/RootContext'
import "./Post.css"

const Post = () => {
  const [isContent, setIsContent] = useState()
  const PostContent = isContent ? isContent.post : null

  console.log(isContent)
  
  const { userInfo } = useContext(RootContext)
  const userEmail = userInfo ? userInfo.email : null
  const postKey = localStorage.getItem("postKey")

  const getThePost = async () => {
    const docRef = doc(db, userEmail, postKey);
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      setIsContent(docSnap.data())
    } else {
      console.log("No such document!!!")
    }
  }

  useEffect(() => {
    if(userEmail){
      getThePost()
    }
  }, [userEmail, postKey])
  return (
    <div className="w-screen min-h-screen flex justify-center py-28 px-5 lg:px-10">
      <div className="w-full max-w-2xl">
        <div className='content' dangerouslySetInnerHTML={{__html: PostContent}} />
      </div>
    </div>
  )
}

export default Post
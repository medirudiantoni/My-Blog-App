import React, { useRef, useState } from 'react'
import { createContext } from 'react'

export const EditPostContext = createContext();
const Provider = EditPostContext.Provider;
// import EditorJS from '@editorjs/editorjs';

const EditPostContextProvider = (Children) => {
  return () => {
  const [test, setTest] = useState(false);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState();
  const [article, setArticle] = useState();
  const [rawArticle, setRawArticle] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [postKey, setPostKey] = useState()

  const handleBlogInfo = (title, cat, file) => {
    setTitle(title);
    setCat(cat);
    setFile(file)
  }

  const handleArticle = (article, raw) => {
    setArticle(article)
    setRawArticle(raw)
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <Provider value={{test, title, cat, file, article, isPreview , rawArticle, handleBlogInfo, handleArticle, handlePreview}}>
      <Children />
    </Provider>
  )
  }
}

export default EditPostContextProvider;
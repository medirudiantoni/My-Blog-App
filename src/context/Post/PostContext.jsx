import React, { useRef, useState } from 'react'
import { createContext } from 'react'

export const PostContext = createContext();
const Provider = PostContext.Provider;
import EditorJS from '@editorjs/editorjs';

const PostContextProvider = (Children) => {
  return () => {
  const [test, setTest] = useState(false);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState();
  const [article, setArticle] = useState();
  const [isPreview, setIsPreview] = useState(false);

  const handleBlogInfo = (title, cat, file) => {
    setTitle(title);
    setCat(cat);
    setFile(file)
  }

  const handleArticle = (article) => {
    setArticle(article)
  }

  const handlePreview = () => {
    setIsPreview(!isPreview)
  }

  return (
    <Provider value={{test, title, cat, file, article, isPreview , handleBlogInfo, handleArticle, handlePreview}}>
      <Children />
    </Provider>
  )
  }
}

export default PostContextProvider;
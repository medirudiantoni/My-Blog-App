import React, { useContext } from "react";
import "./Editor.css";
import { motion } from "framer-motion";
import { ButtonWhite } from "../../Components/Buttons/Button1";
import { PostContext } from "../../context/Post/PostContext";
import { RootContext } from "../../context/Auth/RootContext";

const PostPreview = () => {
  const { handlePreview, article, postKey } = useContext(PostContext);
  
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-[1000] top-0 left-0 w-screen h-screen bg-white overflow-y-scroll"
    >
      <div className="p-5 lg:px-10 border-b-2 flex items-center justify-between">
        <p className="text-xl font-semibold text-slate-600">Preview</p>
        <ButtonWhite name={"close"} onClick={handlePreview} />
      </div>
      <div className="w-full h-fit p-5 lg:px-10">
        <div className="first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:font-serif" dangerouslySetInnerHTML={{__html: article}} />
      </div>
    </motion.div>
  );
};

export default PostPreview;

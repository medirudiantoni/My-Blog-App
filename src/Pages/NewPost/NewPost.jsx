import React, { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EditorCanvas from "./EditorCanvas";
import BlogInfo from "./BlogInfo";
import "./Editor.css";
import { db } from "../../Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PostContextProvider, { PostContext } from "../../context/Post/PostContext";
import PostPreview from "./PostPreview";

const NewPost = () => {
  const {isPreview} = useContext(PostContext);

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-y-scroll">
      <div className="p-5">
        <p className="text-3xl font-semibold">New Post</p>
      </div>
      <div className="w-full h-fit bord2 border-teal-600">
        <div className="w-full h-fit bord2 border-blue-600 grid grid-cols-10">
          <div className="col-span-10 order-2 md:order-1 md:col-span-7 bord2 bg-slate-200 p-5 min-h-screen">
            <div className="w-full h-full bg-white shadow-lg p-5">
              <EditorCanvas />
            </div>
          </div>
          <div className="col-span-10 order-1 md:order-2 md:col-span-3 bord2 border-violet-600 p-5">
            <div className="">
              <BlogInfo />
            </div>
          </div>
        </div>
      </div>
      {isPreview && (
        <AnimatePresence mode="wait">
          <PostPreview />
        </AnimatePresence>
      )}
    </div>
  );
};

export default PostContextProvider(NewPost);

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { RootContext } from "../../context/Auth/RootContext";
import PostPreview from "./PostPreview";
import { AnimatePresence } from "framer-motion";
import BlogInfo from "./BlogInfo";
import EditorCanvas from "./EditorCanvas";
import EditPostBlogInfo from "./EditPostBlogInfo";
import EditPostEditorCanvas from "./EditPostEditorCanvas";
import EditPostContextProvider, {
  EditPostContext,
} from "../../context/Post/EditPostContext";

const EditPost = () => {
  const [postContent, setPostContent] = useState();

  const { handleBlogInfo, handleArticle, handlePreview } =
    useContext(EditPostContext);
  const title = postContent ? postContent.title : false;
  const cat = postContent ? postContent.category : false;
  const file = postContent ? postContent.posterUrl : false;
  const article = postContent ? postContent.post : false;
  const raw = postContent ? postContent.rawArticle : false;

  useEffect(() => {
    if (postContent) {
      handleBlogInfo(title, cat, file);
      handleArticle(article, raw);
    }
  }, [postContent]);

  const { postId } = useParams();
  const { userInfo } = useContext(RootContext);

  const userEmail = userInfo ? userInfo.email : false;

  const getPostContent = async () => {
    const docRef = doc(db, userEmail, postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPostContent(docSnap.data());
    } else {
      console.log("no such documenteee!!!");
    }
  };

  useEffect(() => {
    getPostContent();
  }, []);

  return (
    <div className="flex flex-col w-full h-[90vh] overflow-y-scroll">
      <div className="p-5">
        <p className="text-3xl font-semibold">Edit Post</p>
      </div>
      <div className="w-full h-fit bord2 border-teal-600">
        <div className="w-full h-fit bord2 border-blue-600 grid grid-cols-10">
          <div className="col-span-10 order-2 md:order-1 md:col-span-7 bord2 bg-slate-200 p-5 min-h-screen">
            <div className="w-full h-full bg-white shadow-lg p-5">
              {/* <EditorCanvas /> */}
              <EditPostEditorCanvas />
            </div>
          </div>
          <div className="col-span-10 order-1 md:order-2 md:col-span-3 bord2 border-violet-600 p-5">
            <div className="">
              <EditPostBlogInfo />
            </div>
          </div>
        </div>
      </div>
      {/* {isPreview && (
        <AnimatePresence mode="wait">
          <PostPreview />
        </AnimatePresence>
      )} */}
    </div>
  );
};

export default EditPostContextProvider(EditPost);

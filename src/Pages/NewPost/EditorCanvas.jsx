import React, { useContext, useEffect, useRef } from 'react';
import "./Editor.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/Header";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import { ButtonBlue } from '../../Components/Buttons/Button1';
import { PostContext } from '../../context/Post/PostContext';

const EditorCanvas = () => {
  const editorInstanceRef = useRef(null);

  const {article, handleArticle} = useContext(PostContext)

  useEffect(() => {
    if(!editorInstanceRef.current){
      editorInstanceRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: {
            class: Header,
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          image: {
            class: ImageTool,
            config: {},
          },
        },
        onChange: async () => {
          const data = await editorInstanceRef.current.save();
          handleArticle(data);
        }
      });
    }

  }, []);

  return (
    <>
      <div id="editorjs" className="2xl:py-10"></div>
    </>
  )
}

export default EditorCanvas


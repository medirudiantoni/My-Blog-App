import React, { useContext, useEffect, useRef } from 'react';
import "./Editor.css";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/Header";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import Strikethrough from "@sotaproject/strikethrough";
import SimpleImage from "@editorjs/simple-image";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
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
            class: SimpleImage,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true
              }
            }
          },
          underline: {
            class: Underline,
          },
          strikethrough: {
            class: Strikethrough,
          },
          marker: {
            class: Marker
          },
          inlineCode: {
            class: InlineCode
          },
          color: {
            class: ColorPlugin,
            config: {
              colorCollections: [
                '#EC7878',
                '#9C27B0',
                '#673AB7',
                '#3F51B5',
                '#0070FF',
                '#03A9F4',
                '#00BCD4',
                '#4C4F50',
                '#FFF',
              ],
              defaultColor: "#FF1300",
              customPicker: true
            }
          }
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

export default EditorCanvas;


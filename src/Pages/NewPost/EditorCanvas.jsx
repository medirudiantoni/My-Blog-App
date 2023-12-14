import React, { useContext, useEffect, useRef } from 'react';
import "./Editor.css";
import { storage } from '../../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  const imageName = `images/${file.name}`;
                  const storageRef = ref(storage, imageName);
                  const uploadTask = uploadBytesResumable(storageRef, file);

                  return new Promise((resolve, reject) => {
                    uploadTask.on(
                      "state_changed",
                      (snapshot) => {
                        const progress =
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                          case "paused":
                            console.log("Upload is paused");
                            break;
                          case "running":
                            console.log("Upload is running");
                            break;
                          default:
                            break;
                        }
                      },
                      (error) => {
                        console.log(error)
                      },
                      () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                          resolve({
                            success: 1,
                            file: {
                              url,
                            }
                          })
                        })
                        .catch((error) => {
                          console.log(error);
                          reject({
                            success: 0,
                            file: {
                              url: '',
                            },
                            error: {
                              message: 'Error getting download URL',
                            },
                          });
                        });
                      }
                    );
                  })
                }
              }
            }
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
              defaultColor: "#333333",
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


import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ButtonBlue, ButtonOrange } from "../../Components/Buttons/Button1";
import "./Editor.css"
import posterPNG from "../../assets/poster.png";
import { PostContext } from "../../context/Post/PostContext";
import { RootContext } from "../../context/Auth/RootContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const BlogInfo = ({}) => {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [imgUrl, setImgUrl] = useState();

  const navigate = useNavigate();

  const {article, handlePreview} = useContext(PostContext);
  const {userInfo, handleSavePreviewPostKey} = useContext(RootContext);

  const postDate = () => {
    const time = new Date();
    const hour = time.getHours();
    const munite = time.getMinutes();
    const date = time.getDate();
    const month = time.getMonth();
    const year = time.getFullYear();
    const months = ['january', 'february', 'march', 'april', 'mei', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const format = `${date}-${months[month]}-${year}, ${hour}:${munite}`;
    return format;
  }

  const uploadFilePoster = (file) => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      uploadFilePoster(file)
    }
  };

  const handleSubmitPost = () => {
    const postDocRef = doc(db, userInfo.email, postDate())
    setDoc(postDocRef, {
      date: postDate(),
      title: title,
      category: cat ? cat : null,
      post: article,
      posterUrl: imgUrl ? imgUrl : null,
    })
    .then(() => {
      console.log('berhasil menambahkan post');
    })
    .catch((error) => {
      console.log(error)
    })

  }

  return (
    <div className="">
      <label htmlFor="title">Post Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="title"
        className="w-full mt-2 mb-4 py-2 px-4 rounded-lg border"
        onChange={e => setTitle(e.target.value)}
      />
      <label htmlFor="category">Post Category</label>
      <input
        id="category"
        name="category"
        type="text"
        placeholder="category"
        className="w-full mt-2 mb-4 py-2 px-4 rounded-lg border"
        onChange={e => setCat(e.target.value)}
      />
      <div className="w-full h-fit">
        <p>Post poster</p>
        <div className="w-full h-32 mt-2 mb-4 bg-slate-200 relative rounded-lg overflow-hidden group flex items-center justify-center">
          {image ? <img src={image} className="w-full h-full object-cover" /> : <img src={posterPNG} className="w-8 h-8 object-cover opacity-20" />}
          <label htmlFor="poster" className="">
            <div id="posterLabel" className="w-full h-full bg-slate-200/40 absolute left-0 bottom-0 cursor-pointer group-hover:flex items-center justify-center hidden">
              <img src={posterPNG} alt="add poster" className="w-8 aspect-square object-cover opacity-40" />
            </div>
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            id="poster"
            placeholder="poster"
            className="w-full mt-2 mb-4 py-2 px-4 rounded-lg border absolute z-50 bg-blue-600 h-full opacity-0 cursor-pointer
            "
          />
        </div>
      </div>
      <div className="flex gap-2">
        <ButtonBlue name={"Submit"} onClick={() => {
          handleSubmitPost();
          navigate('/')
        }} />
        {article && <ButtonOrange name={"Preview"} onClick={handlePreview} />}
      </div>
    </div>
  );
};

export default BlogInfo;

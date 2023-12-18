import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../Firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ButtonBlue, ButtonOrange } from "../../Components/Buttons/Button1";
import "./Editor.css"
import posterPNG from "../../assets/poster.png";
import { useNavigate } from "react-router";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { EditPostContext } from "../../context/Post/EditPostContext";

const EditPostBlogInfo = ({}) => {
  const { title, cat, file } = useContext(EditPostContext)
  const [isTitle, setIsTitle] = useState();
  const [isCat, setIsCat] = useState();
  const [isFile, setIsFile] = useState();
  const [isImage, setIsImage] = useState();
  const [isImgUrl, setIsImgUrl] = useState();
  const [isCardColor, setIsCardColor] = useState();
  const navigate = useNavigate();

  console.log({isTitle, isCat, isFile})

  useEffect(() => {
    if(title){
        setIsTitle(title || '')
        setIsCat(cat || '')
        setIsFile(file || '')
        setIsImage(file || '')
    }
  }, [title, cat, file])


  const colorOptions = [
    { primary: "#A78BFA", secondary: "#7C3AED", text: "#000", value: "violet", label: <div className="w-3 h-3 rounded-sm bg-violet-500"></div> },
    { primary: "#5EEAD4", secondary: "#0D9488", text: "#000", value: "teal", label: <div className="w-3 h-3 rounded-sm bg-teal-500"></div> },
    { primary: "#2C2C2C", secondary: "#181818", text: "#fff", value: "dark-gray", label: <div className="w-3 h-3 rounded-sm bg-[#2c2c2c]"></div> },
    { primary: "#FDE047", secondary: "#EAB308", text: "#000", value: "yellow", label: <div className="w-3 h-3 rounded-sm bg-yellow-500"></div> },
    { primary: "#7DD3FC", secondary: "#0EA5E9", text: "#000", value: "sky", label: <div className="w-3 h-3 rounded-sm bg-sky-500"></div> },
    { primary: "#E2E8F0", secondary: "#CBD5E1", text: "#000", value: "slate", label: <div className="w-3 h-3 rounded-sm bg-slate-500"></div> },
  ]

  const handleSelectedColor = (selectedColor) => {
    setIsCardColor(selectedColor)
  }

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
          setIsImgUrl(downloadURL)
        });
      }
    );
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIsFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIsImage(reader.result);
      };
      reader.readAsDataURL(file);
      uploadFilePoster(file)
    }
  };

  return (
    <div className="">
      <label htmlFor="title">Post Title</label>
      <input
        id="title"
        name="title"
        type="text"
        value={isTitle}
        placeholder="title"
        className="w-full mt-2 mb-4 py-2 px-4 rounded-lg border"
        onChange={e => setIsTitle(e.target.value)}
      />
      <label htmlFor="category">Post Category</label>
      <input
        id="category"
        name="category"
        type="text"
        value={isCat}
        placeholder="category"
        className="w-full mt-2 mb-4 py-2 px-4 rounded-lg border"
        onChange={e => setIsCat(e.target.value)}
      />
      <div className="w-full h-fit">
        <p>Post poster</p>
        <div className="w-full h-32 mt-2 mb-4 bg-slate-200 relative rounded-lg overflow-hidden group flex items-center justify-center">
          {isImage ? <img src={isImage} className="w-full h-full object-cover" /> : <img src={posterPNG} className="w-8 h-8 object-cover opacity-20" />}
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
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <Dropdown options={colorOptions} onSelect={handleSelectedColor} horizontal={true} shapeValue={true} />
      </div>
      <div className="flex gap-2">
        <ButtonBlue name={"Submit"} onClick={() => {
          navigate('/')
        }} />
        {/* {article && <ButtonOrange name={"Preview"} onClick={handlePreview} />} */}
      </div>
    </div>
  );
};

export default EditPostBlogInfo;

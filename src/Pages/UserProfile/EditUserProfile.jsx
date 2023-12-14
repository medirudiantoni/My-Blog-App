import React, { useState, useEffect, useContext } from "react";
import { db, auth, storage } from "../../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateEmail, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { RootContext } from "../../context/Auth/RootContext";
import { ButtonBlue, ButtonGreen, ButtonRed } from "../../Components/Buttons/Button1";
import editPNG from "../../assets/edit.png";
import potraitPNG from "../../assets/portrait.png";
import { useNavigate } from "react-router";

const EditUserProfile = () => {
  const { userInfo } = useContext(RootContext);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [usernameValue, setUsernameValue] = useState();
  const [emailValue, setEmailValue] = useState();
  const [phoneValue, setPhoneValue] = useState();
  const [roleValue, setRoleValue] = useState("Story teller");
  const [file, setFile] = useState("");
  const [imgUrl, setImgUrl] = useState();
  const [imageFile, setImageFile] = useState();

  const currentUser = auth.currentUser;
  const navigate = useNavigate()

  useEffect(() => {
    const getUserInfo = async () => {
      const docRef = doc(db, "users", userInfo.email);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser(docSnap.data());
        setUsernameValue(docSnap.data().username);
        setEmailValue(docSnap.data().email);
        setPhoneValue(docSnap.data().phone);
        setImageFile(docSnap.data().imageUrl);
      } else {
        console.log("No such document!");
      }
    };
    getUserInfo();
  }, [userInfo.email]);

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const uploadFile = () => {
      const name = currentUser.uid + file.name;
      const storageRef = ref(storage, name);
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
    };
    file && uploadFile();
  }, [file]);

  const handleSubmitUpdateUserData = () => {
    console.log({usernameValue, emailValue, phoneValue, imgUrl});
    setIsLoading(true);
    const userDocRef = doc(db, "users", currentUser.email);
    return setDoc(userDocRef, {
      username: usernameValue,
      email: emailValue,
      phone: phoneValue,
      uid: currentUser.uid,
      imageUrl: imgUrl ? imgUrl : imageFile,
      role: roleValue 
    })
    .then(()=>{
      setIsLoading(false)
      alert('berhasil mengubah data');
      navigate('/profile');
    })
    .catch((error) => console.log(error))
  }

  return (
    <div className="w-full h-full p-5 bg-slate-100">
      <div className="text-3xl font-semibold mb-5">Edit User Profile</div>
      <div className="w-full p-8 bg-white">
        <div className="flex flex-wrap relative">
          <div className="w-full max-w-xs flex flex-col gap-4">
            <div className="w-32 h-32 rounded-full overflow-hidden relative group bg-slate-400 flex items-center justify-center">
                {imageFile ? <img
                src={imageFile}
                alt=" "
                className="w-full h-full object-cover"
              /> : <img src={potraitPNG} className="w-5 h-5 absolute object-cover" />}
              <div className="absolute left-0 bottom-0 w-full h-full duration-200 flex items-center justify-end">
                <label
                  htmlFor="imageUpload"
                  className="w-full h-full flex items-center justify-center space-x-2 cursor-pointer bg-transparent group-hover:bg-slate-100/80"
                >
                  <img
                    src={potraitPNG}
                    alt=""
                    className="w-5 h-5 object-cover hidden group-hover:block"
                  />
                  <input onChange={handleImageChange} type="file" id="imageUpload" className="hidden" />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-xl">{usernameValue}</p>
              <div className="w-full flex items-center gap-2">
                <img
                  src={editPNG}
                  alt=" "
                  className="top-0 w-4 h-4 object-cover"
                />
                <input
                  onChange={e => setRoleValue(e.target.value)}
                  type="text"
                  name="role"
                  id="role"
                  value={roleValue}
                  className="w-full focus:outline-none text-sm text-slate-700"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 md:px-8 md:border-l-2">
            <div className="">
              <label htmlFor="username" className="text-sm text-slate-700">
                Username
              </label>
              <div className="w-full flex items-center gap-2">
                <img
                  src={editPNG}
                  alt=" "
                  className="top-0 w-4 h-4 object-cover"
                />
                <input
                  onChange={e => setUsernameValue(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  value={usernameValue}
                  className="w-full font-semibold focus:outline-none"
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="email" className="text-sm text-slate-700">
                Email
              </label>
              <div className="w-full flex items-center gap-2">
                <img src={editPNG} alt=" " className="w-4 h-4 object-cover" />
                <input
                  onChange={e => setEmailValue(e.target.value)}
                  type="text"
                  name="email"
                  id="email"
                  value={emailValue}
                  className="w-full font-semibold focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="text-sm text-slate-700">
                Phone
              </label>
              <div className="w-full flex items-center gap-2">
                <img
                  src={editPNG}
                  alt=" "
                  className="top-0 w-4 h-4 object-cover"
                />
                <input
                  onChange={e => setPhoneValue(e.target.value)}
                  type="number"
                  maxLength={12}
                  name="phone"
                  id="phone"
                  value={phoneValue}
                  className="w-full font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex gap-2 md:justify-end">
          <ButtonRed name={'Cancel'} onClick={() => navigate('/profile')} />
          <ButtonGreen name={isLoading ? 'Loading' : 'Save'} onClick={handleSubmitUpdateUserData} />
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;

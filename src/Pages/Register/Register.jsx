import React, { useState } from "react";
import blogging from "../../assets/illustration/blogging.png";
import { createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../../Firebase";
import { useNavigate } from "react-router";
import { ButtonBlue, ButtonWhite } from "../../Components/Buttons/Button1";

const Register = () => {
  const [userName, setUserName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  const handleSaveData = async (uid) => {
    const userDoc = doc(db, 'users', email)
    return setDoc(userDoc, {
      username: userName,
      email: email,
      phone: phone,
      uid: uid
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/login')
        return handleSaveData(userCredential.user.uid);
      })
      .then(() => {
        setIsLoading(false)
        signOut(auth)
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log({errorMessage})
        setIsError(true);
        setIsLoading(false)
      });
  };

  const authProvider = new GoogleAuthProvider();
  const signUpWithGoogle = () => {
    signInWithPopup(auth, authProvider).then((userCredential) => {
      const usernameByGoogle = userCredential.user.displayName;
      const emailByGoogle = userCredential.user.email;
      const phoneByGoogle = userCredential.user.phoneNumber;
      const imageByGoogle = userCredential.user.photoURL;
      const uidByGoogle = userCredential.user.uid;
      const userDoc = doc(db, "users", emailByGoogle)
      return setDoc(userDoc, {
        username: usernameByGoogle,
        email: emailByGoogle,
        phone: phoneByGoogle,
        image: imageByGoogle,
        uid: uidByGoogle
      })
    })
    .then(() => {
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full grid grid-cols-12">
        <div className="hidden md:col-span-8 h-full md:flex bg-blue-500 justify-center items-center">
          <img
            src={blogging}
            alt="blogging"
            className="w-1/2 h-fit object-cover"
          />
        </div>
        <div className="col-span-12 md:col-span-4 h-full bg-white flex items-center justify-center">
          <div className="max-w-md h-fit p-5">
            <div className="mb-6">
              <p className="text-2xl font-semibold">Register</p>
            </div>
            {isError && <div className="mb-1"><p className="text-red-600">Email sudah digunakan!!!</p></div> }
            <form>
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="BiuBKUbiiP"
                className="w-full py-2 px-4 mt-1 mb-4 border-2 rounded-lg"
              />
              <label htmlFor="phone">Phone</label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="number"
                name="phone"
                id="phone"
                placeholder="0812 xxxx xxxx"
                className="w-full py-2 px-4 mt-1 mb-4 border-2 rounded-lg"
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                id="email"
                placeholder="youremail@email.com"
                className="w-full py-2 px-4 mt-1 mb-4 border-2 rounded-lg"
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="w-full py-2 px-4 mt-1 mb-4 border-2 rounded-lg"
              />
              <button
                onClick={handleSubmit}
                type="submit"
                className={`py-2 px-4 text-white rounded-lg w-full hover:bg-blue-700 active:bg-blue-900 mt-5 ${ isLoading ? 'cursor-not-allowed bg-blue-300' : 'cursor-pointer bg-blue-600' }`}
              >
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            </form>
            <div className="w-full py-2 text-center">or</div>
            <div className="w-full">
              <ButtonWhite wFull={true} name={'sign-up with Google'} onClick={signUpWithGoogle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

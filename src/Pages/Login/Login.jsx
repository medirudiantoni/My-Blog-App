import React, { useContext, useState } from "react";
import blogging from "../../assets/illustration/blogging.png";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router";
import { ButtonWhite } from "../../Components/Buttons/Button1";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isToken, setIsToken] = useState("")

  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setIsLoading(false)
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({errorMessage})
        setIsError(true);
        setIsLoading(false)
      });
  };

  const authProvider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, authProvider)
    .then((userCredential) => {
        setIsLoading2(true)
        console.log(userCredential)
        navigate('/')
      })
      .catch((error) => {
        setIsLoading2(false)
        console.log(error)
      })
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full grid grid-cols-12">
        <div className="hidden md:col-span-8 h-full md:flex bg-teal-600 justify-center items-center">
          <img
            src={blogging}
            alt="blogging"
            className="w-1/2 h-fit object-cover"
          />
        </div>
        <div className="col-span-12 md:col-span-4 h-full bg-white flex items-center justify-center">
          <div className="max-w-md h-fit p-5">
            <div className="mb-6">
              <p className="text-2xl font-semibold">Login</p>
            </div>
            {isError && <div className="mb-1"><p className="text-red-600">Email sudah digunakan!!!</p></div> }
            <form>
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
                {isLoading ? 'Loading...' : 'Login'}
              </button>
            </form>
            <div className="w-full py-2 text-center">or</div>
              <div className="w-full">
                <ButtonWhite wFull={true} name={'Sign in with Google'} onClick={handleSignInWithGoogle} />
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { auth, db } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Home from './Pages/Home/Home';
import Dashboard from './Pages/Dashboard/Dashboard';
import Posts from './Pages/Posts/Posts';
import Assets from './Pages/AssetsPage/Assets';
import Comments from './Pages/Comments/Comments';
import Users from './Pages/Users/Users';
import Settings from './Pages/Settings/Settings';
import NotFound from './Pages/NotFound/NotFound';
import Blog from './Pages/Blog/Blog';
import NewPost from './Pages/NewPost/NewPost';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import GlobalProvider, { RootContext } from './context/Auth/RootContext';
import UserProfile from './Pages/UserProfile/UserProfile';
import EditUserProfile from './Pages/UserProfile/EditUserProfile';
import PostPreview from './Pages/NewPost/PostPreview';
import Post from './Pages/Post/Post';
import Otak_atik from './BuildProcess/Otak_atik';
import EditPost from './Pages/NewPost/EditPost';

const App = () => {
  const [isUser, setIsUser] = useState()
  const [loading, setLoading] = useState(true);

  const { currentUser, handleUser, handleUserData, userData } = useContext(RootContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        handleUser({ type: 'LOGIN', payload: user });
        setIsUser(user);
      } else {
        handleUser({ type: 'LOGOUT' });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [handleUser]);

  const getCurrentUserDataFromFirestoreDb = async (userEmail) => {
    const docRef = doc(db, "users", userEmail)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      handleUserData(docSnap.data())
    } else {
      console.log('No such document!')
    }
  }

  useEffect(() => {
    if(isUser){
      getCurrentUserDataFromFirestoreDb(isUser.email)
    }
  }, [isUser])

  const RequireAuth = ({ children }) => {
    if (loading) {
      // You can show a loading spinner or any other loading indicator here.
      return <div>Loading...</div>;
    }

    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/post' element={<Post />} />
          <Route path='/otak-atik' element={<Otak_atik />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/new" element={<NewPost />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/contributor" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/edit-profile' element={<EditUserProfile />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default GlobalProvider(App);

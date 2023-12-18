import React, { useContext, useEffect, useRef, useState } from "react";
import { postList } from "./postItems";
import PostCard from "./PostCard";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { db } from "../../Firebase";
import { collection, getDocs } from "firebase/firestore";
import { RootContext } from "../../context/Auth/RootContext";
import { Link } from "react-router-dom";

const BottomSection = ({ data, valFromTop, filterValue }) => {
  const scrollComponentRef = useRef(null);
  const [BlogPosts, setBlogPosts] = useState([...postList]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [fi, setfi] = useState(false);
  const [dataCollection, setDataCollection] = useState([]);

  const { userInfo } = useContext(RootContext);

  const getDataCollections = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, userInfo.email));
      let newData = [];

      querySnapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });

      setDataCollection(newData);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    getDataCollections();
  }, []);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const scrolled = scrollComponentRef.current.scrollTop > 100;
      const currentScrollTop = scrollComponentRef.current.scrollTop;
      setIsScrolled(scrolled);
      if (currentScrollTop >= lastScroll) {
        setIsScrollDown(true);
        data({ isScrolled: scrolled, isScrollDown: true });
      } else {
        setIsScrollDown(false);
        data({ isScrolled: scrolled, isScrollDown: false });
      }
      lastScroll = currentScrollTop;
    };

    scrollComponentRef.current.addEventListener("scroll", handleScroll);
  }, []);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth();
    const year = new Date(timestamp).getFullYear();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${months[month]}, ${date}-${year}`;
  };

  if (valFromTop.value === "Oldest") {
    // BlogPosts.sort((a, b) => a.date - b.date);
    dataCollection.sort((a, b) => a.date - b.date);
  } else {
    // BlogPosts.sort((a, b) => b.date - a.date);
    dataCollection.sort((a, b) => b.date - a.date);
  }

  const statusOptions = [
    { value: "All status", label: "All Status" },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];
  const categoryOptions = [
    { value: "All Category", label: "All Category" },
    { value: "Tutorial", label: "Tutorial" },
    { value: "Pandangan", label: "Pandangan" },
    { value: "Berita", label: "Berita" },
    { value: "Sejarah", label: "Sejarah" },
  ];

  const selectedStatus = (value) => {
    console.log(value);
  };
  const selectedCat = (value) => {
    if (value.value === "All Category") {
      setBlogPosts(postList);
    } else {
      setBlogPosts(postList.filter((post) => post.category === value.value));
    }
  };

  return (
    <div className="w-full flex-1 text-sm overflow-hidden bord2 border-teal-600 relative">
      <div
        className={`w-full p-5 h-fit absolute left-0 top-0 origin-top duration-200 ${
          filterValue ? "scale-100" : "scale-0"
        }`}
      >
        <div className="w-full h-fit p-5 flex flex-col gap-2 bg-slate-200 rounded-lg">
          <div className="relative z-10">
            <Dropdown options={categoryOptions} onSelect={selectedCat} />
          </div>
          <div className="relative">
            <Dropdown options={statusOptions} onSelect={selectedStatus} />
          </div>
        </div>
      </div>
      <div className="w-full h-fit pl-5 pr-10 sm:pr-16 md:pr-16 lg:pr-8 xl:pr-10 hidden sm:inline-block">
        <div className="w-full h-full border-b-2 border-black font-semibold grid grid-cols-12">
          <div className="col-span-1 py-2 px-4 pb-1 flex items-center justify-between">
            <div className=""></div>
            <div className="">
              <input type="checkbox" className="w-5 h-5" />
            </div>
          </div>
          <div className="sm:col-span-2 xl:col-span-1 p-2 pb-1">Poster</div>
          <div className="sm:col-span-3 xl:col-span-4 p-2 pb-1">Title</div>
          <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 text-center lg:text-start">
            <Dropdown
              options={categoryOptions}
              onSelect={selectedCat}
              py2={true}
            />
          </div>
          <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 text-center lg:text-start">
            <Dropdown
              options={statusOptions}
              onSelect={selectedStatus}
              py2={true}
            />
          </div>
          <div className="sm:col-span-2 xl:col-span-2 p-2 pb-1 text-center lg:text-start xl:pl-7">
            Date
          </div>
        </div>
      </div>
      <div
        ref={scrollComponentRef}
        className={`w-full  p-5 bord2 overflow-y-scroll border-orange-600 ${
          isScrolled ? "h-[90vh] md:h-[75vh]" : "h-[70vh] md:h-[68vh]"
        }`}
      >
        <div className="w-full h-fit pb-20">
          {dataCollection.length > 0 ? (
            dataCollection.map((post) => {
              return (
                <Link key={post.id} to={`/edit-post/${post.id}`}>
                  <PostCard
                    key={post.id}
                    poster={post.posterUrl}
                    title={post.title}
                    category={post.category}
                    date={post.date}
                  />
                </Link>
              );
            })
          ) : (
            <div className="w-full h-fit py-10 flex justify-center bg-slate-200 rounded-md font-semibold text-slate-800">
              Tidak ada data
            </div>
          )}
          {dataCollection.length >= 1 ? (
            <div className="mt-10 w-full h-fit py-10 flex justify-center bg-slate-100 rounded-md font-semibold text-slate-800">
              Akhir data
            </div>
          ) : null}
          {/* {BlogPosts.length == 0 ? (
            <div className="w-full h-fit py-10 flex justify-center bg-slate-200 rounded-md font-semibold text-slate-800">
              Tidak ada data
            </div>
          ) : (
            BlogPosts.map((post, i) => {
              return (
                <PostCard
                  key={i}
                  poster={post.img}
                  title={post.title}
                  category={post.category}
                  status={post.status}
                  date={formatDate(post.date)}
                />
              );
            })
          )}
          {BlogPosts.length >= 1 ? (
            <div className="mt-10 w-full h-fit py-10 flex justify-center bg-slate-100 rounded-md font-semibold text-slate-800">
              Akhir data
            </div>
          ) : null} */}
        </div>
      </div>
    </div>
  );
};

export default BottomSection;

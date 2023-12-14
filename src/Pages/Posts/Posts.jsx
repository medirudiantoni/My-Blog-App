import React, { useEffect, useRef, useState } from "react";
import { ButtonBlue } from "../../Components/Buttons/Button1";
import { postList } from "./postItems";
import PostCard from "./PostCard";
import Dropdown from "../../Components/Dropdown/Dropdown";
import SearchBar from "../../Components/SearchBar/SearchBar";
import PostRow from "./PostRow";

const Posts = () => {
  const scrollComponent = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrollDown] = useState(false);

  console.log(isScrollDown);
  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const scrolled = scrollComponent.current.scrollTop > 100;
      const currentScrollTop = scrollComponent.current.scrollTop;
      setIsScrolled(scrolled);
      if (currentScrollTop >= lastScroll) {
        setIsScrollDown(true);
      } else {
        setIsScrollDown(false);
      }
      lastScroll = currentScrollTop;
    };

    scrollComponent.current.addEventListener("scroll", handleScroll);
  }, []);

  const dateOptions = [
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
    { value: "Most popular", label: "Most popular" },
  ];
  const statusOptions = [
    { value: "All-status", label: "All Status" },
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
    { value: "Edited", label: "Edited" },
  ];
  const categoryOptions = [
    { value: "All-category", label: "All category" },
    { value: "Pribadi", label: "Pribadi" },
    { value: "khayalan", label: "khayalan" },
    { value: "Kisah", label: "Kisah" },
    { value: "Sejarah", label: "Sejarah" },
    { value: "Tutorial", label: "Tutorial" },
    { value: "Karangan", label: "Karangan" },
  ];

  const handleOptionSelectDate = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
  };
  const handleOptionSelectStatus = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
  };
  const handleOptionSelectCategory = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
  };
  return (
    <div
      className={`w-full bg-white duration-200 ${
        isScrolled ? "-translate-y-[10vh] h-screen" : "-translate-y-0 h-full"
      }`}
    >
      <div
        className={`w-full flex justify-between overflow-hidden duration-300 ${
          isScrolled ? "h-0 py-0 px-5" : "h-fit p-5"
        }`}
      >
        <p className="text-3xl font-semibold">Posts</p>
      </div>
      <div
        className={`w-full h-fit duration-200 flex z-50 bg-white ${
          isScrolled
            ? isScrollDown
              ? "-translate-y-full absolute left-0 top-0"
              : "-translate-y-0 absolute left-0 top-0"
            : "relative"
        }`}
      >
        <div className="w-full top-0 left-0 md:relative md:w-5/6 bord2 py-2 px-4 md:flex flex-wriap items-center gap-2">
          <Dropdown options={dateOptions} onSelect={handleOptionSelectDate} />
          <Dropdown
            options={categoryOptions}
            onSelect={handleOptionSelectCategory}
          />
          <Dropdown
            options={statusOptions}
            onSelect={handleOptionSelectStatus}
          />
          <div className="w-fit">
            <SearchBar placeholder={"Search for posts"} />
          </div>
        </div>
        <div className="w-1/6 flex justify-end bord2 py-2 px-4">
          <ButtonBlue name={"new post"} />
        </div>
      </div>
      <div className="p-5 pb-0 hidden md:inline-block">
        <div className="w-full grid grid-cols-12 pl-5 pr-10 font-semibold text-sm border-b-2 border-black pb-2">
          <div className="col-span-1 p-1.5 flex bordx border-black pl-16">
            Posts
          </div>
          <div className="col-span-4 p-1.5 flex bordx border-black"></div>
          <div className="col-span-2 p-1.5 flex bordx border-black">
            Category
          </div>
          <div className="col-span-2 p-1.5 flex bordx border-black">Topic</div>
          <div className="col-span-1 p-1.5 flex bordx border-black">Status</div>
          <div className="col-span-2 p-1.5 flex bordx border-black">Date</div>
        </div>
      </div>

      <div
        ref={scrollComponent}
        className={`scrollDiv w-full overflow-y-scroll bg-white p-5 ${isScrolled ? 'h-[100vh]' : 'h-[80vh]'}`}
      >
        <div className="w-full pb-56 grid grid-cols-2 sm:grid-cols-3 md:inline-block">
          {postList.map((post, i) => {
            return (
              <div key={i}>
                <PostRow
                  poster={post.img}
                  title={post.title}
                  category={post.category}
                  topic={post.topic}
                  status={post.status}
                  date={post.date}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;

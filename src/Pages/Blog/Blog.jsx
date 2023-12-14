import React, { useEffect, useState } from "react";
import TopSection from "./TopSection";
import BottomSection from "./BottomSection";

const Blog = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollDown, setIsScrolDown] = useState(false);
  const [valFromTop, setValFromTop] = useState({value: 'Newest', label: 'Newest'});
  const [isFilterValue, setIsFilterValue] = useState(false)

  // console.log(isFilterValue)
  const valueAccepted = (val) => {
    setIsScrolled(val.isScrolled);
    setIsScrolDown(val.isScrollDown);
  };
  const valueFromTop = (val) => {
    setValFromTop(val)
  }
  const isFilter = (val) => {
    setIsFilterValue(val)
  }
  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <TopSection scrolled={isScrolled} scrollDown={isScrollDown} postValue={(val) => valueFromTop(val)} filterReveal={val => isFilter(val)} />
      <BottomSection data={(val) => valueAccepted(val)} valFromTop={valFromTop} filterValue={isFilterValue} />
    </div>
  );
};

export default Blog;

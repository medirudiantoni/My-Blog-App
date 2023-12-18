import React, { useEffect, useState } from "react";
import Dropdown from "../../Components/Dropdown/Dropdown";
import { ButtonBlue } from "../../Components/Buttons/Button1";
import InputSearch from "../../Components/InputSearch/InputSearch";
import dropDownPNG from "../../assets/drop-down.png";
import X from '../../assets/circle-xmark.png'

const TopSection = ({ scrolled, scrollDown, postValue, filterReveal }) => {
  const [isFilter, setIsFilter] = useState(false)

  const handleFilter = () => {
    setIsFilter(!isFilter)
    filterReveal(!isFilter)
  }
  const items = [
    { value: "Newest", label: "Newest" },
    { value: "Oldest", label: "Oldest" },
  ];

  const handleOptionSelectDate = (selectedOption) => {
    if (selectedOption.value === "Oldest") {
      postValue(selectedOption);
    } else {
      postValue(selectedOption);
    }
  };
  return (
    <div className="relative z-10">
      <div
        className={`w-full duration-200 ${
          scrolled ? "h-0 py-0 px-5 overflow-hidden" : "h-fit p-5"
        }`}
      >
        <p className="text-3xl font-semibold">Blog post</p>
      </div>
      <div
        className={`w-full h-fit px-5 pt-1 md:hidden duration-200 bg-white ${
          scrolled
            ? scrollDown
              ? "pb-5 absolute top-0 left-0 -translate-y-full"
              : "pb-5 absolute top-0 left-0 -translate-y-0"
            : "pb-1 relative"
        }`}
      >
        <InputSearch />
      </div>
      <div
        className={`w-full md:h-fit px-5 md:p-5 md:pb-5 flex flex-wrap md:justify-between gap-2 md:overflow-visible duration-200 ${
          scrolled ? "h-0 py-0 overflow-hidden" : "h-fit py-2"
        }`}
      >
        <div className="w-fit flex gap-2">
          <Dropdown options={items} onSelect={handleOptionSelectDate} />
          <button onClick={handleFilter} className={`flex items-center justify-center px-3 border rounded-md border-gray-300 md:hidden active:bg-blue-400 ${isFilter ? 'bg-blue-300' : ''}`}>
            <img src={dropDownPNG} alt="v" className="w-4 h-4 object-cover" />
          </button>
          <div className="hidden md:inline-block w-full md:w-80">
            <InputSearch />
          </div>
        </div>
        <ButtonBlue name={"New Post"} />
      </div>
    </div>
  );
};

export default TopSection;

import React from "react";

const PostRow = ({poster, title, category, topic, status, date}) => {
  return (
    <div className="col-span-1 md:w-full grid grid-cols-12 p-2 md:p-3 mb-5 md:mb-0 rounded-2xl md:rounded-none md:border-b-2 md:border-x-0 md:border-t-0 text-sm hover:bg-slate-200 relative">
      <div className="col-span-12 md:col-span-5 md:p-1.5 flex flex-col md:flex-row md:items-center gap-4 bordx border-black">
        <input type="checkbox" className="w-5 h-5 bg-slate-500 rounded-md mr-7 hidden md:block" />
        <div className="relative w-full aspect-square rounded-lg md:rounded-none md:w-[100px] md:h-[70px] bg-slate-600 overflow-hidden">
            <img src={poster} alt={category} className="w-full h-full object-cover" />
        </div>
        {/* <div className="w-full aspect-square mb-3 md:hidden"></div> */}
        <div className="w-full mb-2 md:mb-0 md:w-2/3">
            <p className="font-bold">{title}</p>
        </div>
      </div>
      <div className="col-span-6 md:col-span-2 md:p-1.5 hidden md:flex flex-col md:flex-row md:items-center bordx border-black">{category}</div>
      <div className="col-span-6 md:col-span-2 md:p-1.5 hidden md:flex flex-col md:flex-row md:items-center bordx border-black">{topic}</div>
      <div className="col-span-6 md:col-span-1 md:p-1.5 hidden md:flex flex-col md:flex-row md:items-center bordx border-black">{status}</div>
      <div className="col-span-12 md:col-span-2 md:p-1.5 flex flex-col md:flex-row md:items-center bordx border-black"><div className="mb-2 font-semibold text-xs hidden">Date</div><div className="">{date}</div></div>
    </div>
  );
};

PostRow.defaultProps = {
    poster: "https://source.unsplash.com/1000x1000?robot"
}

export default PostRow;

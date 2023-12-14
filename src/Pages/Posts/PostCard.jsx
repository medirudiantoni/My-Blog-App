import React, { useEffect, useRef, useState } from "react";

const PostCard = ({key, img, title, category, topic, version, status, date}) => {
  
  return (
    <div className="w-full h-full p-3 pr-5 rounded-xl bg-white grid gap-4 grid-cols-4 relative hover:bg-violet-200 shadow-xl">

      <div className="col-span-4 w-full sm:col-span-1 aspect-[4/3] max-h-28 rounded-lg overflow-hidden bg-slate-400">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="col-span-4 sm:col-span-3 text-sm flex flex-col justify-between p-2 relative">
        
        <div className="w-full pb-2 mb-5 md:mb-0 bord2">
          <h1 className="font-bold text-base">
            {title}
          </h1>
        </div>
        <div className="w-full h-fit bord2 flex items-start gap-5 flex-wrap md:flex-nowrap justify-between lg:justify-start">
          <div className="">
            <p className="text-xs mb-1.5">category</p>
            <p className="font-semibold">{category}</p>
          </div>
          <div className="">
            <p className="text-xs mb-1.5">Topic</p>
            <p className="font-semibold">{topic}</p>
          </div>
          <div className="">
            <p className="text-xs mb-1.5">Version</p>
            <p className="font-semibold">{version}</p>
          </div>
          <div className="">
            <p className="text-xs mb-1.5">Status</p>
            <p className="font-semibold">{status}</p>
          </div>
          <div className="">
            <p className="text-xs mb-1.5">Date</p>
            <p className="font-semibold">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

import React, { useEffect, useState } from "react";
import crossSmallPNG from "../../assets/crossSmall.png";
import { motion } from "framer-motion";

const ModalTop = ({ type, message, onClose, warning, danger, fixed }) => {
  const [autoClose, setAutoClose] = useState(false);
  useEffect(() => {
    const letItClose = setTimeout(() => {
      setAutoClose(true);
    }, 5000);
    return () => clearTimeout(letItClose);
  }, []);

  if(fixed){
    if (autoClose) {
      return null;
    }
  }

  return (
    <div className={` w-full max-w-2xl h-[10vh] flex sm:items-center justify-center ${fixed ? 'fixed top-0 sm:right-1/4 z-[1000]' : 'text-sm mb-5'}`}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        className={`py-4 px-4 w-full h-fit rounded-lg overflow-hidden flex justify-between relative shadow-xl 
        ${danger ? "bg-[#ff0000] text-white " : "bg-blue-200"}
        ${warning ? "bg-orange-100" : "bg-blue-200"}
        `}
      >
        <div className={`flex ${fixed ? '' : 'flex-col'}`}>
          <p className="font-semibold">{type ? type : "Notification"}</p>
          <p className={`ml-0.5 mr-3 font-semibold ${fixed ? '' : 'hidden'}`}>{": "}</p>
          <p className="font-normal">{message ? message : "for you"}</p>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className={`w-6 h-6 p-0.5 rounded-md flex items-center justify-center active:scale-95 duration-75
        ${
          danger
            ? "bg-red-200 hover:bg-red-300 active:bg-red-500"
            : "bg-blue-300 hover:bg-blue-400 active:bg-blue-500"
        }
        ${
          warning
            ? "bg-orange-200 hover:bg-orange-300 active:bg-orange-500"
            : "bg-blue-300 hover:bg-blue-400 active:bg-blue-500"
        }
        `}
        >
          <img
            src={crossSmallPNG}
            alt="x"
            className="w-full h-full object-cover"
          />
        </button>
        {fixed && !autoClose && (
          <motion.div
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: 1, transformOrigin: "left" }}
            transition={{ duration: 5, ease: "linear" }}
            className={`absolute left-0 bottom-0 h-1 w-full
          ${danger ? "bg-red-800" : "bg-blue-600"}
          ${warning ? "bg-orange-600" : "bg-blue-600"}
          `}
          ></motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ModalTop;

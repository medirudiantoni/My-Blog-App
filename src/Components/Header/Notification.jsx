import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const Notification = ({ isNotification }) => {
  return (
    <div className="absolute top-full right-0 w-screen md:w-96 md:right-24">
      <AnimatePresence mode="wait">
        {isNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`p-5 md:p-0`}
          >
            <div className="w-full h-fit p-5 bg-white md:bg-white/20 shadow-xl rounded-lg md:backdrop-blur-lg">
              <div className="w-full pb-2 mb-2 border-b-2 border-black font-semibold">
                Notification
              </div>
              <div className="w-full p-5 text-center bg-slate-200 rounded-md">
                no notification
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;

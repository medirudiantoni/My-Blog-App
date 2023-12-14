import React, { useContext, useEffect } from "react";
import { RootContext } from "../../context/Auth/RootContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {

  return (
    <div className="w-full h-full">
      <div className="w-full p-5">
        <p className="text-3xl font-semibold">Dashboard</p>
      </div>

    </div>
  );
};

export default Dashboard;

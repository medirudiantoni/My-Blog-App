import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/Auth/AuthContext";
import NotificationProvider from "./context/Notification/NotificationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

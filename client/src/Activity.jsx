import React from "react";
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./components/Auth";
import Login from "./pages/Login";

export default function Activity() {
  const {IsLoggedIn} = useAuth();
  if(IsLoggedIn){
    return (
    <div className="h-[100vh]">
      <div className="flex select-none">
        <Sidebar />
        <div className="flex flex-column w-full content-main">
          <TopBar />
          <Content />
        </div>
      </div>
    </div>
  );
  } else {
    return <Login />
  }
  
}

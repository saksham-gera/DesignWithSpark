import React from "react";
import TopBar from "./components/TopBar";
import Content from "./components/Content";
import Sidebar from "./components/Sidebar";

export default function Activity() {
  return (
    <>
      <div className="flex select-none">
        <Sidebar />
        <div className="flex flex-column w-full content-main">
          <TopBar />
          <Content />
        </div>
      </div>
    </>
  );
}

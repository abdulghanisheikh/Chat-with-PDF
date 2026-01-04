"use client";
import {useState} from "react";
import Navbar from "./components/navbar.js";
import UploadPDF from "./components/upload-component.js";

const Page=()=>{
  return <div className="h-screen w-screen flex flex-col items-center">
      <Navbar />
      <UploadPDF />
    </div>
}

export default Page;
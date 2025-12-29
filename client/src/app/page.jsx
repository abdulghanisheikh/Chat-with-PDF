"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import UploadPDF from "../components/UploadPDF";
import Chat from "../components/Chat";

const page=()=>{
  return <div className='h-screen w-screen flex flex-col bg-neutral-900'>
    <Navbar></Navbar>
    <div className='main flex h-full w-full bg-zinc-900 text-white'>
      <div className="flex justify-center items-center h-full w-[35vw]">
        <UploadPDF />
      </div>
      <div className="right h-full w-[65vw] border-l-2 border-white p-2">
        <Chat></Chat>
      </div>
    </div>
  </div>
}

export default page;
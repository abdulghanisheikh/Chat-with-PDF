"use client";
import React from 'react';
import Navbar from '../components/Navbar';
import UploadPDF from "../components/UploadPDF";
import Chat from "../components/Chat";

const page=()=>{
  return <div className='h-screen w-screen flex flex-col bg-zinc-900'>
    <Navbar></Navbar>
    <div className='main h-full w-full flex text-white'>
      <div className="left w-[35vw] flex justify-center items-center">
        <UploadPDF />
      </div>
      <div className="right w-[65vw] border-l-2 border-white/50 p-2">
        <Chat />
      </div>
    </div>
  </div>
}

export default page;
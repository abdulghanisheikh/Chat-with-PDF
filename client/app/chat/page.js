"use client";
import React,{ useState,useContext } from 'react';
import { SendHorizontal } from 'lucide-react';
import { toast,ToastContainer } from "react-toastify";
import axios from "axios";
import {redirect} from "next/navigation";
import {Brain,User} from "lucide-react";
import {PdfContext} from "../context/pdf-context.js";

const Chat=()=>{
    const [query,setQuery]=useState("");
    const {pdfFile}=useContext(PdfContext);
    console.log(pdfFile);
    const [messages,setMessages]=useState([{
        role:"assistant",
        message:`Ask me anything about ${pdfFile}?`
    }]);
    const baseUrl="http://localhost:8000";

    async function handleSendChatMessage(){
        try{
            setMessages((prev)=>{
                return [...prev,{role:"user",message:query}]
            });
            const {data}=await axios.get(`${baseUrl}/chat?message=${query}`);
            const {message}=data;
            if(success){
                setMessages((prev)=>{
                    return [...prev,{role:"assistant",message}]
                });
            }
            setQuery("");
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    return <div className='h-full w-full flex flex-col lg:justify-center lg:items-center relative'>
        <div className='flex w-full justify-between items-center px-4 lg:px-10 lg:mt-3 lg:w-2/3'>
            <div onClick={()=>redirect("/")} className='py-0.5 px-2 rounded-sm hover:shadow-md shadow-black/50 bg-zinc-800 w-fit m-2 cursor-pointer duration-300 ease-in-out active:scale-90'>
            <p className='text-white lg:text-lg'>Back to upload</p>
            </div>
            <h1 className='text-white lg:text-lg bg-zinc-800 px-2 py-0.5 rounded-sm underline'>{pdfFile}</h1>
        </div>
        <ol className='chats py-1 lg:px-10 px-2 mt-5 flex flex-col gap-2 w-full lg:w-2/3 h-screen text-white'>
            {messages.map((msg,index)=>{
                return <li key={index} className="flex gap-1 items-center text-white text-sm w-full">
                   <div className="p-1 rounded-full bg-zinc-900">{msg.role==="assistant"?<Brain size="20" />:<User />}</div>
                   <div className='p-1 text-xs px-2 rounded-md bg-zinc-800'>{msg.message}</div>
                </li>
            })}
        </ol>
        <div className='messageBox w-full flex justify-center items-center absolute bottom-5 duration-300 ease-in-out gap-3'>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Write your message here' className='bg-zinc-700 text-white font-semibold px-3 py-3 rounded-lg border-none outline-none lg:w-1/2 w-[75%]'/>
            <div className={`p-2 rounded-full cursor-pointer bg-white active:scale-95 duration-250 ease-in-out hover:scale-110 hover:-rotate-20 ${query.trim()===""&&"pointer-events-none opacity-50 cursor-not-allowed"}`} onClick={handleSendChatMessage}>
                <SendHorizontal fontWeight="700" color="black"/>
            </div>
        </div>
        <ToastContainer position='top-right'/>
    </div>
}

export default Chat;
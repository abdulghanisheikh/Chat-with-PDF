import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import {toast,ToastContainer} from "react-toastify";
import axios from "axios";

const Chat=()=>{
    const [query,setQuery]=useState("");
    const [messages,setMessages]=useState([{ //state for mantaining convo between assistant and user
        role:"",
        message:""
    }]);
    const baseUrl="http://localhost:8000";

    async function handleSendChatMessage(){
        try{
            setMessages((prev)=>{
                return [...prev,{role:"user",message:query}]
            });
            const res=await axios.get(`${baseUrl}/chat?message=${query}`);
            const {message}=res.data;
            if(success){
                setMessages((prev)=>{
                    return [...prev,{role:"assistant",message}]
                });
            }
            console.log(messages);
            setQuery("");
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    return <div className='h-full w-full flex relative'>
        <div className='h-100 w-full p-4'>
            {messages.map((message,index)=>{
                return <div key={index} className='text-white w-full p-2'>
                <p>{message.role}</p>
                <p>{message.message}</p>
                </div>
            })}
        </div>
        <div className='w-full flex justify-center items-center absolute bottom-3 hover:bottom-5 duration-300 ease-in-out gap-3'>
            <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Write your message here' className='bg-zinc-700 font-semibold px-5 py-3 rounded-lg border-none outline-none w-1/2'/>
            <div className={`p-2 rounded-full cursor-pointer bg-white active:scale-95 duration-250 ease-in-out hover:scale-110 hover:-rotate-20 ${query.trim()===""&&"pointer-events-none opacity-50 cursor-not-allowed"}`} onClick={handleSendChatMessage}>
                <SendHorizontal fontWeight="700" color="black"/>
            </div>
        </div>
        <ToastContainer position='top-right'/>
    </div>
}

export default Chat;
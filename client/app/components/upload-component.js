"use client";
import React, { useState,useContext } from 'react';
import { Upload } from 'lucide-react';
import axios from "axios";
import { redirect } from "next/navigation";
import { toast,ToastContainer } from "react-toastify";
import {PdfContext} from "../context/pdf-context.js";

const UploadPDF=()=>{
    const baseUrl="http://localhost:8000";
    const {pdfFile,setPdfFile}=useContext(PdfContext);

    function handlePDFUpload(){
        try{
            const el=document.createElement("input");
            el.setAttribute("type","file");
            el.setAttribute("accept","application/pdf");
            el.addEventListener('change',async()=>{
                const formData=new FormData();
                const pdf=el.files[0];
                formData.append("pdf",pdf);
                const res=await axios.post(`${baseUrl}/upload/pdf`,formData);
                const {success,message}=res.data;
                if(success){
                    toast.success(message);
                    setPdfFile(pdf.name);
                    setTimeout(()=>{
                        redirect("/chat");
                    },2000);
                }
                else{
                    toast.error(message);
                }
            });
            el.click();
        }
        catch(err){
            toast.error(err.response?.data?.message);
        }
    }

    return <div className='flex flex-col w-full mt-100 gap-5 items-center text-white'>
        <div className=''>
            <p className="text-lg text-semibold"><span className='font-semibold'>{`Uploaded PDF : ${pdfFile}`}</span></p>
        </div>
        <div onClick={handlePDFUpload} className='p-4 lg:w-[40%] w-[60%] border-l border-r border-t border-white hover:border-0 hover:shadow-md hover:shadow-black/50 hover:scale-105 active:scale-95 duration-300 ease-in-out rounded-xl text-white cursor-pointer bg-zinc-800 text-center flex justify-center items-center gap-3'>
            <h1 className='font-semibold text-lg'>Upload PDF here</h1>
            <Upload />
        </div>
        <ToastContainer position="top-right" />
    </div>
}

export default UploadPDF;
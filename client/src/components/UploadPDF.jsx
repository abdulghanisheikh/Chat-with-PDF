import React from 'react';
import { Upload } from 'lucide-react';

const UploadPDF=()=>{
    const baseUrl="http://localhost:8000";
    function handlePDFUpload(){
        try{
            const el=document.createElement("input");
            el.setAttribute("type","file");
            el.setAttribute("accept","application/pdf");
            el.addEventListener('change',async()=>{
                const formData=new FormData();
                const pdfFile=el.files[0];
                formData.append("pdf",pdfFile);
                const res=await axios.post(`${baseUrl}/upload/pdf`,{formData});
                const {success,message}=res.data;
                if(success){
                    
                }
            });
            el.click();
        }
        catch(err){
            console.log(err);
        }
    }

    return <div onClick={handlePDFUpload} className='p-4 w-[50%] border-l border-r border-t border-white hover:border-0 hover:shadow-md hover:shadow-white/10 hover:scale-105 active:scale-95 duration-300 ease-in-out rounded-xl text-white cursor-pointer bg-zinc-800 text-center flex justify-center items-center gap-3'>
        <h1 className='font-semibold text-lg'>Upload PDF here</h1>
        <Upload />
    </div>
}

export default UploadPDF;
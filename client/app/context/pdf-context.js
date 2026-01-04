"use client";
import {createContext,useState} from "react";
export const PdfContext=createContext(null);

export const PdfProvider=(props)=>{
    const [pdfFile,setPdfFile]=useState("");
    return <PdfContext.Provider value={{
        pdfFile,setPdfFile
    }}>
        { props.children }
    </PdfContext.Provider>
}
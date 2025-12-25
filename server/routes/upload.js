import express from "express";
import {upload} from "../configs/multer.js";
const router=express.Router();

router.post("/upload",upload.single('pdfFile'),(req,res)=>{
    try{

    }
    catch(err){
        return res.status(500).json({
            success:true,
            message:"Server error",
            error:err.message
        });
    }
});
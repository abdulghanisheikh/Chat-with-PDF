import express from "express";
import upload from "../configs/multer.config.js";
const route=express.Router();

route.post("/pdf",upload.single('pdf'),(req,res)=>{
    try{
        //process
        res.status(200).json({
            sucess:true,
            message:"Upload Successfull"
        });
    }
    catch(err){
        return res.status(500).json({
            success:true,
            message:"Server error",
            error:err.message
        });
    }
});

export default route;
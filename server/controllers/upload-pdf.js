import {pdfQueue} from "../queue/pdfQueue.js";
import path from "path";

async function uploadPDF(req,res){
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"No file uploaded"
            });
        }
        await pdfQueue.add("pdf-ready",{
            fileName:req.file.originalname,
            filePath:path.resolve(req.file.path)
        });
        return res.status(200).json({
            success:true,
            message:"PDF uploaded and queued for processing."
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:err.message
        });
    }
}

export default uploadPDF;
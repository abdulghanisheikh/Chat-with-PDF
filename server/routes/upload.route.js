import express from "express";
import upload from "../configs/multer.js";
const route=express.Router();
import uploadPDF from "../controllers/upload-pdf.js";

route.post("/pdf",upload.single('pdf'),uploadPDF);

export default route;
import express from "express";
const router=express.Router();
import {chat} from "../controllers/chat.js";

router.get("/",chat);

export default router;
import {config} from "dotenv";
config();
import express from "express";
const app=express();
import uploadRoute from "./routes/upload.route.js";
import cors from "cors";

app.use(cors());
app.use("/upload",uploadRoute);

app.get("/",(req,res)=>{
    return res.json({
        message:"Hello from server"
    });
});

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`);
});
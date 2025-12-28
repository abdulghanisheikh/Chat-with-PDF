import {config} from "dotenv";
config();
import express from "express";
const app=express();
import cors from "cors";
import uploadRoute from "./routes/upload.route.js";

app.use(cors());
app.use("/upload",uploadRoute);

//sample route
app.get("/",(req,res)=>{
    return res.json({
        message:"Hello from server"
    });
});

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`);
});
import {config} from "dotenv";
config();
import express from "express";
const app=express();
import cors from "cors";

app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","DELETE","PATCH"],
}));

app.get("/",(req,res)=>{
    return res.json({
        message:"Hello from server!"
    });
});

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`);
});
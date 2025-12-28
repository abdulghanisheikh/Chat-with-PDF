import {config} from "dotenv";
config();
import express from "express";
const app=express();
import cors from "cors";
import uploadRoute from "./routes/upload.route.js";
import chatRoute from "./routes/chat.route.js";

app.use(cors());
app.use("/upload",uploadRoute);
app.use("/chat",chatRoute);

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server is running on PORT ${port}`);
});
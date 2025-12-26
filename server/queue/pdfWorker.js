import {Worker} from "bullmq";
import {connection} from "./redis.js";

const worker=new Worker("pdf-queue",async(job)=>{
    const {filename,filePath}=job.data;
    console.log("processing:",filename);
    console.log("file path:",filePath);
    //rest logic
    return {status:"done"}
},{connection});

worker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});
worker.on("failed",(job)=>{
    console.log(`Job ${job.id} failed`);
});
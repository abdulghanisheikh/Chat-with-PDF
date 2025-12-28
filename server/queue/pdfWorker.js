import {config} from "dotenv";
import path from "path";
config({
    path:path.resolve(process.cwd(),"../.env")
});
import {Worker} from "bullmq";
import {connection} from "./redis.js";
import {OpenAIEmbeddings} from "@langchain/openai";
import {QdrantVectorStore} from "@langchain/qdrant";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";

const worker=new Worker("pdf-queue",async(job)=>{
    const data=job.data;
    const loader=new PDFLoader(data.filePath);
    const docs=await loader.load(); //array of documents
    const embeddings=new OpenAIEmbeddings({
        apiKey:process.env.OPENAI_API_KEY,
        model:"text-embedding-3-small"
    });
    const vectorStore=await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
            url:process.env.QDRANT_URL,
            collectionName:"pdf-content"
        });
    await vectorStore.addDocuments(docs);
    console.log(`All docs are stored in vector store`);
},{connection});

worker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});
worker.on("failed",(job,err)=>{
    console.log(`Job ${job.id} failed`);
    console.log(err.message);
});
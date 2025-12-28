import {config} from "dotenv";
import path from "path";
config({
    path:path.resolve(process.cwd(),"../.env")
});
import {Worker} from "bullmq";
import {connection} from "./redis.js";
import {QdrantVectorStore} from "@langchain/qdrant";
import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import {CharacterTextSplitter} from "@langchain/textsplitters";

const worker=new Worker("pdf-queue",async(job)=>{
    const data=job.data;
    const loader=new PDFLoader(data.filePath);
    const docs=await loader.load(); //array of documents
    const splitter=new CharacterTextSplitter({
        chunkSize:500,
        chunkOverlap:0
    });
    const chunks=await splitter.splitDocuments(docs);
    const embeddings=new HuggingFaceInferenceEmbeddings({
        apiKey:process.env.HF_API_KEY,
        model:"sentence-transformers/all-MiniLM-L6-v2"
    });
    const vectorStore=await QdrantVectorStore.fromExistingCollection(embeddings,{
        collectionName:"pdf-content",
        url:process.env.QDRANT_URL 
    });
    await vectorStore.addDocuments(chunks);
    console.log(`documents uploaded in vector store`);
},{connection});

worker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});
worker.on("failed",(job,err)=>{
    console.log(`Job ${job.id} failed`);
    console.log(err.message);
});
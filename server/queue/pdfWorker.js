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

async function chunkPDF(path){
    const loader=new PDFLoader(path);
    const docs=await loader.load();
    const splitter=new CharacterTextSplitter({
        chunkSize:500,
        chunkOverlap:0
    });
    const chunks=await splitter.splitDocuments(docs);
    return chunks;
}

async function doVectorEmbeddings(chunks){
    const embeddings=new HuggingFaceInferenceEmbeddings({
        apiKey:process.env.HF_API_KEY,
        model:"sentence-transformers/all-MiniLM-L6-v2"
    });
    const vectorStore=await QdrantVectorStore.fromExistingCollection(embeddings,{
        collectionName:"pdf-content",
        url:process.env.QDRANT_URL
    });
    await vectorStore.addDocuments(chunks);
}

const worker=new Worker("pdf-queue",async(job)=>{
    const data=job.data;
    const chunks=await chunkPDF(data.filePath);
    await doVectorEmbeddings(chunks);
    console.log("vector embedding of PDF is done");
},{connection});

worker.on("completed",(job)=>{
    console.log(`Job ${job.id} completed`);
});
worker.on("failed",(job,err)=>{
    console.log(`Job ${job.id} failed`);
    console.log(err.message);
});
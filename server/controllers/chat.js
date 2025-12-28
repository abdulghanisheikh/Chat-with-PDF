import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import {QdrantVectorStore} from "@langchain/qdrant";
import {ChatGroq} from "@langchain/groq";

export async function chat(req,res){
    try{
        const userQuery=req.query;
        const embeddings=new HuggingFaceInferenceEmbeddings({
            apiKey:process.env.HF_API_KEY,
            model:"sentence-transformers/all-MiniLM-L6-v2"
        });
        const vectorStore=await QdrantVectorStore.fromExistingCollection(embeddings,{
            collectionName:"pdf-content",
            url:process.env.QDRANT_URL
        });
        const retriever=vectorStore.asRetriever({
            k:2
        });
        const similarVectorSearch=await retriever.invoke(userQuery);
        const llm=new ChatGroq({
            model:"openai/gpt-oss-120b",
            apiKey:process.env.GROQ_API_KEY,
            temperature:0,
            maxRetries:2,
        });
        const systemPrompt=`
            You are an expert AI assistant which resolves the user queries based on the context of the pdf.
            PDF Context: ${JSON.stringify(similarVectorSearch)}
        `;
        const aiMsg=await llm.invoke([{
            role:"system",
            content:systemPrompt
        },{
            role:"user",
            content:userQuery
        }]);
        return res.json({
            success:true,
            query:userQuery,
            aiMsg:aiMsg.content
        });
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"Server error"
        });
    }
}
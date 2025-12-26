import { Queue } from "bullmq";
import { connection } from "./redis.js";

export const pdfQueue=new Queue("pdf-queue",{connection});
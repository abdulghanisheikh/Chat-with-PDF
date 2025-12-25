import multer from "multer";
const destination=multer.memoryStorage();
export const upload=multer({
    dest:destination
});
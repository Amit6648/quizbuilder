import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();


const filter =  (req : Request, file : Express.Multer.File, cb : multer.FileFilterCallback)=>{
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
        
        
    }
    else
    {
        cb(null, false);
    
        
    }
}


export const uploadMiddleware = multer({
    storage : storage,
    fileFilter : filter,
    limits : {
        fileSize : 10 * 1024 *1024
    }
})

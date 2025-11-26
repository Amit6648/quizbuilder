import express from 'express';
import  {uploadMiddleware}  from '../middleware/uploadMiddleware.js';
import { pdfToTextContoller } from '../controller/orc.controller.js';


const router = express.Router();

router.post('/', pdfToTextContoller);
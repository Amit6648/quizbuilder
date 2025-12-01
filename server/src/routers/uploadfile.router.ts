import express from 'express';
import { pdfToTextContoller } from '../controller/orc.controller.js';
import { uploadMiddleware } from '../middleware/uploadMiddleware.js';


const router = express.Router();

router.post('/', uploadMiddleware.single('file') , pdfToTextContoller);

export default router;
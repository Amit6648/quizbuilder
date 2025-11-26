import express from 'express';
import { pdfToTextContoller } from './controller/orc.controller.js';
import { uploadMiddleware } from './middleware/uploadMiddleware.js';

const app = express();

app.use(express.json());

app.use('/uploadFile',uploadMiddleware.single("file"),  pdfToTextContoller);


app.listen(3000, () => {
    console.log("working");
})
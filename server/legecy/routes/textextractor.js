import express from 'express';
import multer from 'multer';
import tesseract from 'tesseract.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PDFParse = require('pdf-parse');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
import { orginize } from '../services/gemini.service.js';
import { inserttopicandsource } from '../dbfunctions/storetopics.js';

const router = express.Router();


import { createCanvas } from 'canvas';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const pdftoimage = async (page) => {
    const viewport = page.getViewport({ scale: 4.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    const rendercontext = {
        canvasContext: context,
        viewport: viewport
    }

    await page.render(rendercontext).promise;
    return canvas.toBuffer('image/png');

}



router.post('/', upload.single('pdffile'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ "error": "no file founded" });
    }


    try {

        const data = await PDFParse(req.file.buffer);

        if (data.text && data.text.trim().length > 50) {

            console.log(data.text);

            const response = await orginize(data.text);
            console.log(response);
            
            await inserttopicandsource(response);
            return res.status(201).json({ "done": "date is stored lodu" })

        }

        console.log('No text found. Falling back to OCR...');

        const loadingtask = pdfjsLib.getDocument(req.file.buffer);

        const pdfdocument = await loadingtask.promise;

        let ocr = '';
        const nofpages = pdfdocument.numPages;

        for (let i = 1; i <= nofpages; i++) {
            console.log(`Processing page ${i}/${nofpages} with OCR...`);
            const page = await pdfdocument.getPage(i);
            const imagebuffer = await pdftoimage(page);
            const { data: { text } } = await tesseract.recognize(
                imagebuffer,
                'eng',
                { logger: m => console.log(m.status) }
            );
            ocr += text + '\n';

        }

        console.log("done processing now sending the data to api");

        const response = await orginize(ocr);

        await inserttopicandsource(response)

       return res.status(201).json({ "done": "date is stored lodu" })

    } catch (error) {
        console.log(error)
        res.status(400).json({ "error": "somthing went wrong" });
    }
})


export default router;

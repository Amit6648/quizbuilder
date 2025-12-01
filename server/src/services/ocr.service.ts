import tesseract from 'tesseract.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const PDFParse = require('pdf-parse');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

import { createCanvas } from 'canvas';
import { PDFPageProxy } from 'pdfjs-dist';
import { orginize } from './gemini.service.js';
import { topics } from '../types/gemini.types.js';
import { saveSourceAndTopics } from './dbSources.services.js';


const pdftoimage = async (page: PDFPageProxy): Promise<Buffer> => {
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d') as unknown as CanvasRenderingContext2D;

    const rendercontext = {
        canvasContext: context,
        viewport: viewport
    }

    await page.render(rendercontext).promise;
    return canvas.toBuffer('image/png');

}

export const pdfToText = async (file: Buffer) => {
    try {

        const data = await PDFParse(file);

        if (data.text && data.text.trim().length > 50) {


            const ogTopic = await orginize(data.text);
            const result  = await saveSourceAndTopics(ogTopic); 

            return result;

        }

        console.log('No text found. Falling back to OCR...');

        const loadingtask = pdfjsLib.getDocument(file);

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

        const ogTopic = await orginize(ocr);
        const result  = await saveSourceAndTopics(ogTopic); 
        console.log(result);
        
        return result;


    } catch (error: any) {
        console.log(error)

        return error;

    }
}



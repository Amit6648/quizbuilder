import { Request, Response } from "express";
import { pdfToText } from "../services/ocr.service.js";


export const pdfToTextContoller = async (req: Request, res: Response) => {
    if (!req.file) {
        return res.status(400).json({ error: "Please upload a PDF file." });
    }

    try {
        const text = await pdfToText(req.file.buffer);

        res.status(200).json({
            messege: " text got extracted",
            text: text
        })
    } catch (error) {
        res.status(400).json({
            messege: " something went wrong",
            error: error
        })
    }
}
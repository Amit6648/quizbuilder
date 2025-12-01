import { Request, response, Response } from 'express';
import { allTopics } from '../services/dbtopics.service.js';
import { getTopicsById } from '../services/dbtopics.service.js';


export const getAllTopicsController = async (req: Request, res: Response) => {
    try {
        const result = await allTopics();

        res.status(200).json({
            data: result
        })
    } catch (error) {
        res.status(401).json({
            response: "there is a error",
            error: error
        })
    }
}

export const getTopicsByIdController = async (req: Request, res: Response) => {
    if (!req.body.data) {

        res.status(401).json({
            messege: " no data found"
        })

    }


    try {

        
        const result = await getTopicsById(req.body.data);

        res.status(200).json({
            messege: " done",
            data: result
        })
    } catch (error) {
        res.status(401).json({
            messege: " something went wrong",
            error: error
        })
    }
}